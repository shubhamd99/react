# Auth Security Review

**Last Audit Date:** 2026-03-15
**Audited By:** Auth Auditor Agent (Claude Sonnet 4.6)
**Project:** DevStash
**Auth Stack:** NextAuth v5, Prisma, bcrypt, Resend

---

## Summary

The authentication implementation is solid in most areas — bcrypt salt rounds are correct, email enumeration is prevented across all endpoints, tokens use a cryptographically secure source, and all protected API routes verify session ownership. Three real issues were found: verification and reset tokens are stored as plaintext in the database (a DB breach directly enables account takeover), JWT sessions are not invalidated after password reset (an attacker who stole a session token retains access), and the login endpoint has no server-side brute force protection. The token entropy issue (UUID vs. randomBytes) is a minor hardening point, not a critical flaw.

**Critical:** ~~1~~ 0 (fixed) | **High:** ~~1~~ 0 (fixed) | **Medium:** 1 | **Low:** 2 (LOW-01 also resolved by CRIT-01 fix)

---

## Issues

### Critical Severity

#### CRIT-01: Verification and Password Reset Tokens Stored as Plaintext in the Database — FIXED

> **Status:** FIXED (2026-03-15)
> **Fix:** `src/lib/auth/verification.ts` — Added `hashToken()` (SHA-256). Both `generateVerificationToken` and `generatePasswordResetToken` now use `crypto.randomBytes(32).toString("hex")` for 256-bit entropy and store the SHA-256 hash in the DB. `validateVerificationToken` and `validatePasswordResetToken` hash the incoming token before lookup. Raw tokens are only ever sent in emails, never stored. Also resolves LOW-01 (token entropy).

- **File:** `src/lib/auth/verification.ts:16-24`, `src/lib/auth/verification.ts:102-106`
- **Description:** Both `generateVerificationToken` and `generatePasswordResetToken` stored the raw token directly into the `VerificationToken.token` column. If the database was compromised — via a SQL injection elsewhere, a backup leak, or a misconfigured Neon branch — an attacker could read any valid token and use it immediately to verify email addresses or reset passwords without access to the victim's email inbox.
- **Impact:** A database read (not even write) access converted directly into account takeover for any user with a pending password reset token. For email verification tokens, it allowed an attacker to verify arbitrary accounts. The `VerificationToken` table is also used by NextAuth internally, amplifying the blast radius.

---

### High Severity

#### HIGH-01: JWT Sessions Are Not Invalidated After Password Reset — FIXED

> **Status:** FIXED (2026-03-15)
> **Fix:** Added `tokenInvalidBefore` (DateTime?) column to User model via Prisma migration. JWT callback in `src/auth.ts` now checks `token.iat` against `user.tokenInvalidBefore` on every request — if the token was issued before that timestamp, it is marked as invalidated. Both `reset-password` and `change-password` endpoints set `tokenInvalidBefore: new Date()` when updating the password. This approach was chosen over switching to database sessions because NextAuth v5 Credentials provider requires JWT strategy.

- **File:** `src/app/api/auth/reset-password/route.ts:44-49`
- **Description:** After a successful password reset, the handler updated `hashedPassword` but took no action against active JWT sessions. Because the project uses `strategy: "jwt"` (`src/auth.ts:16`), session tokens were stateless and could not be revoked. An attacker who obtained a user's session cookie (via XSS, network interception, or physical device access) retained full authenticated access after the victim reset their password — the intended security benefit of the reset was lost.
- **Impact:** Password reset did not terminate unauthorized access. The window of continued attacker access equaled the JWT session lifetime (NextAuth default is 30 days unless explicitly configured otherwise). This is the primary reason account takeover victims reset passwords.

---

### Medium Severity

#### MED-01: No Server-Side Brute Force Protection on the Login Endpoint

- **File:** `src/auth.ts:26-51` (Credentials `authorize` function)
- **Description:** The credentials `authorize` function performs a database lookup and `bcrypt.compare` on every login attempt with no rate limiting, lockout, or exponential backoff. The `forgot-password` and `resend-verification` endpoints have rate limiting (`src/lib/auth/verification.ts:73-85`, `src/lib/auth/verification.ts:147-161`), but the login path has none. An attacker can submit unlimited password guesses against any known email address.
- **Impact:** Credential stuffing and password spraying attacks against the login endpoint are unconstrained. bcrypt at cost 12 provides some natural throttling (~200–400ms per attempt on a typical server), but at scale with distributed requests this is insufficient. A targeted attack against a single account with a weak password (min length is 8, no complexity requirement) could succeed.
- **Evidence:** The `authorize` function in `src/auth.ts` has no rate limit check before line 32 (`prisma.user.findUnique`). No IP-based or email-based throttle exists anywhere in the request path for `/api/auth/callback/credentials` (the NextAuth-handled signin endpoint).
- **Fix:** Add an email-based rate limit check in the `authorize` function using the same in-database pattern already used for password reset. A Redis-based solution (noted as planned in the project) would be more robust, but the existing DB-based approach is sufficient as a first step:
  ```ts
  // In authorize(), before the DB lookup:
  const canAttempt = await checkLoginRateLimit(email); // e.g., max 5 attempts per 15 min
  if (!canAttempt) throw new CredentialsSignin("rate_limited");
  ```
  Alternatively, integrate a library such as `@upstash/ratelimit` when Redis is added.

---

### Low Severity

#### LOW-01: Token Entropy Is 122 Bits Instead of 128 Bits — FIXED

> **Status:** FIXED (2026-03-15) — Resolved as part of CRIT-01 fix. Both token generators now use `crypto.randomBytes(32).toString("hex")` (256-bit entropy).

- **File:** `src/lib/auth/verification.ts:13`, `src/lib/auth/verification.ts:99`
- **Description:** Both `generateVerificationToken` and `generatePasswordResetToken` used `crypto.randomUUID()`. A v4 UUID has 6 fixed bits (version and variant), leaving 122 bits of actual randomness. NIST SP 800-57 and common security guidance recommend a minimum of 128 bits of entropy for security tokens.
- **Impact:** Negligible in practice. No known attack is viable against 122-bit entropy tokens with reasonable expiry windows.

#### LOW-02: `NEXT_PUBLIC_EMAIL_VERIFICATION` Feature Flag Leaks Server Security Configuration to the Client

- **File:** `src/lib/config.ts:7-8`
- **Description:** The email verification toggle is read from `NEXT_PUBLIC_EMAIL_VERIFICATION`, which means its value is bundled into the client-side JavaScript and visible to anyone who inspects the page source. When set to `false` (the current default), a user browsing the JS bundle can confirm that email verification is disabled and that accounts are auto-verified on registration — reducing the friction for automated mass account creation.
- **Impact:** Low. The actual verification enforcement is server-side (`src/auth.ts:41`). Client-side knowledge of this flag does not bypass any check. However, leaking security configuration details is poor practice and the flag value has no legitimate reason to be exposed to the browser.
- **Fix:** Rename the environment variable to `EMAIL_VERIFICATION` (no `NEXT_PUBLIC_` prefix) and import it only in server-side files (`src/auth.ts`, `src/app/api/auth/register/route.ts`). Remove the import from `src/components/auth/SignInForm.tsx` — the unverified-state UI is conditional on the server returning `code === "unverified"`, which already only happens when verification is enabled, so the client-side `EMAIL_VERIFICATION_ENABLED` guard on lines 111 and 122 of `SignInForm.tsx` is redundant.

---

## Passed Checks

- [x] **bcrypt salt rounds** — All password hashing uses `bcrypt.hash(password, 12)`, which is above the minimum recommended cost factor of 10. (`src/app/api/auth/register/route.ts:53`, `src/app/api/auth/reset-password/route.ts:44`, `src/app/api/auth/change-password/route.ts:56`)
- [x] **Async bcrypt usage** — All calls use `bcrypt.compare` and `bcrypt.hash` (async), never the blocking sync variants.
- [x] **Password never returned or logged** — The `hashedPassword` field is excluded from all API responses. `getUserProfile` in `src/lib/db/profile.ts:27-36` selects it only to derive the boolean `hasPassword`, and does not include it in the returned object.
- [x] **Timing-safe password comparison** — `bcrypt.compare` is used for credential verification in `src/auth.ts:38`, which is inherently constant-time within the bcrypt implementation.
- [x] **Token generation uses CSPRNG** — Both `crypto.randomUUID()` calls use Node.js's `crypto` module, which is backed by the OS CSPRNG. `Math.random` is not used anywhere in the auth flow.
- [x] **Token expiry enforced** — Verification tokens expire after 24 hours (`src/lib/auth/verification.ts:4`). Password reset tokens expire after 1 hour (`src/lib/auth/verification.ts:88`). Expiry is checked server-side before use (`src/lib/auth/verification.ts:42-48`, `src/lib/auth/verification.ts:124-128`).
- [x] **Tokens are single-use** — Both `validateVerificationToken` and `validatePasswordResetToken` delete the token record immediately upon successful validation, before returning success (`src/lib/auth/verification.ts:58-60`, `src/lib/auth/verification.ts:133-134`).
- [x] **Email enumeration prevention on forgot-password** — The forgot-password endpoint returns an identical generic success response whether the email exists or not (`src/app/api/auth/forgot-password/route.ts:11-14`, `src/app/api/auth/forgot-password/route.ts:37-39`).
- [x] **Email enumeration prevention on resend-verification** — Returns a 200 with `{ success: true }` for unrecognised, already-verified, and OAuth-only accounts (`src/app/api/auth/resend-verification/route.ts:31-33`).
- [x] **Rate limiting on password reset** — The forgot-password endpoint enforces a 60-second cooldown per email before a new reset token can be generated (`src/lib/auth/verification.ts:147-161`, `src/app/api/auth/forgot-password/route.ts:42-48`).
- [x] **Rate limiting on email verification resend** — The resend-verification endpoint enforces a 60-second cooldown per email (`src/lib/auth/verification.ts:73-85`, `src/app/api/auth/resend-verification/route.ts:35-40`).
- [x] **Session authentication on protected API routes** — Both `change-password` and `delete-account` call `auth()` and return 401 if `session?.user?.id` is absent (`src/app/api/auth/change-password/route.ts:21-23`, `src/app/api/auth/delete-account/route.ts:7-9`).
- [x] **Change-password requires current password** — The handler retrieves the stored hash and calls `bcrypt.compare(currentPassword, user.hashedPassword)` before allowing the update (`src/app/api/auth/change-password/route.ts:48-53`).
- [x] **Delete-account uses server-side session identity** — The deletion targets `session.user.id` from the server-validated session, not any user-supplied ID from the request body. IDOR is not possible (`src/app/api/auth/delete-account/route.ts:19-21`).
- [x] **Dashboard route protection** — `src/proxy.ts` exports `auth` as the `proxy` function. The `authorized` callback in `src/auth.config.ts:20-27` blocks unauthenticated access to all `/dashboard/*` paths and redirects to the sign-in page.
- [x] **Profile page server-side session check** — The profile page calls `auth()` and redirects to `/sign-in` if no session is present, independently of the proxy layer (`src/app/dashboard/profile/page.tsx:28-29`).
- [x] **Input validation with Zod** — All API route handlers validate request bodies with Zod schemas before processing. Email format, password length, and field presence are enforced server-side.
- [x] **Unverified users blocked from signing in** — When `EMAIL_VERIFICATION_ENABLED` is true, the `authorize` function throws `EmailNotVerifiedError` before returning a session for unverified credential users (`src/auth.ts:41-43`).
- [x] **Open redirect protection on callbackUrl** — NextAuth v5 validates `callbackUrl` by default, only allowing same-origin URLs. No custom `redirect` callback overrides this behavior in `auth.config.ts` or `auth.ts`.
- [x] **Password not exposed in registration error messages** — The registration endpoint returns only validation error strings from Zod, never echoing back submitted credentials (`src/app/api/auth/register/route.ts:27-31`).
- [x] **Cascading deletes on account removal** — The Prisma schema uses `onDelete: Cascade` on all user-owned relations (`Account`, `Session`, `Item`, `Collection`), so a `prisma.user.delete` atomically removes all user data.

---

## Out of Scope

Items handled automatically by NextAuth v5 and not audited:

- **CSRF protection** — NextAuth v5 built-in for all POST auth endpoints
- **Cookie security flags** (`httpOnly`, `secure`, `sameSite`) — Set automatically by NextAuth v5
- **OAuth state parameter validation** — Handled by NextAuth v5 GitHub provider
- **Session token rotation** — Handled by NextAuth v5 on each session access
- **JWT encryption** — NextAuth v5 signs and encrypts JWTs using `AUTH_SECRET`

---

## Recommendations Priority

1. ~~**CRIT-01** — Hash tokens before DB storage.~~ **FIXED (2026-03-15)** — Tokens are now SHA-256 hashed before storage. `crypto.randomBytes(32)` replaces `crypto.randomUUID()`, providing 256-bit entropy (also resolves LOW-01).
2. ~~**HIGH-01** — Invalidate sessions on password reset.~~ **FIXED (2026-03-15)** — Added `tokenInvalidBefore` field to User model. JWT callback validates `token.iat` against this timestamp. Both reset-password and change-password set it on update.
3. **MED-01** — Add server-side login rate limiting. Implement an email-based attempt counter in the `authorize` function using the existing database-backed pattern already used for reset and resend endpoints.
4. **LOW-02** — Move `EMAIL_VERIFICATION` to a server-only environment variable. Remove the `NEXT_PUBLIC_` prefix and update the two server-side files that consume it.
