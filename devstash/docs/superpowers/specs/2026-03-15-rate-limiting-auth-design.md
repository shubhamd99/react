# Rate Limiting for Auth — Design Spec

## Problem

Auth endpoints are unprotected against brute force attacks, credential stuffing, and email-sending abuse. The only existing protection is a 60-second token-creation-time check for forgot-password and resend-verification.

## Solution

Add Upstash Redis-backed rate limiting to all auth endpoints using `@upstash/ratelimit` with sliding window algorithm.

## Dependencies

- `@upstash/ratelimit` — rate limiting library
- `@upstash/redis` — Redis client for Upstash
- Env vars: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

## Rate Limit Configuration

| Endpoint | Route | Limit | Window | Key |
|----------|-------|-------|--------|-----|
| Login | `/api/auth/login` (new) | 5 | 15 min | `login:{ip}:{email}` |
| Register | `/api/auth/register` | 3 | 1 hour | `register:{ip}` |
| Forgot password | `/api/auth/forgot-password` | 3 | 1 hour | `forgot:{ip}` |
| Reset password | `/api/auth/reset-password` | 5 | 15 min | `reset:{ip}` |
| Resend verification | `/api/auth/resend-verification` | 3 | 15 min | `resend:{ip}:{email}` |

## Architecture

### New file: `src/lib/rate-limit.ts`

- Creates Upstash Redis client from env vars
- Exports a rate limiter factory using sliding window algorithm
- Exports 5 pre-configured limiters (one per endpoint)
- Exports `getIP(request)` helper: extracts from `x-forwarded-for` header, falls back to `127.0.0.1`
- Exports `checkRateLimit(limiter, key)` wrapper that returns `{ success, remaining, reset }` and fails open (allows request) if Upstash is unavailable, logging a warning via `console.warn`
- Exports `rateLimitResponse(reset)` helper that builds a 429 Response with `Retry-After` header and user-friendly JSON error message. Computes retry seconds as `Math.ceil((reset - Date.now()) / 1000)` (Upstash returns `reset` as Unix ms timestamp)

### New route: `/api/auth/login/route.ts`

A **rate-limit gate** for login — not a replacement for NextAuth's auth flow. Session creation stays with NextAuth.

Flow:
1. Parse and validate request body with Zod (`{ email: z.string().email(), password: z.string().min(1) }`)
2. Extract IP via `getIP(request)`
3. Rate limit check using `login:{ip}:{email}` key
4. If rate limited: return 429 with `Retry-After` header
5. If allowed: return `{ success: true }`

**Frontend two-step flow:**
1. `SignInForm` calls `POST /api/auth/login` with `{ email, password }`
2. If 429 → show rate limit error in error banner
3. If 200 → call `signIn("credentials", { email, password, redirect: false })` as before
4. Handle signIn result normally (existing error handling for invalid credentials, unverified email, etc.)

This preserves NextAuth's session/cookie handling while giving us proper 429 status codes and `Retry-After` headers. The rate limit gate counts all attempts (valid and invalid) toward the limit.

**Bypass limitation:** An attacker could skip the gate and hit `/api/auth/callback/credentials` directly. This is acceptable for now — the gate protects the standard frontend flow. Middleware-based rate limiting (out of scope) would close this gap entirely.

### Modified routes

Each existing route gets a rate limit check added **at the top of the handler, before any business logic** (including user lookup — important for user enumeration prevention on forgot-password):

- `register/route.ts` — check `register:{ip}`, return 429 if limited
- `forgot-password/route.ts` — check `forgot:{ip}`, return 429 if limited (before user lookup)
- `reset-password/route.ts` — check `reset:{ip}`, return 429 if limited
- `resend-verification/route.ts` — check `resend:{ip}:{email}`, return 429 if limited

### Frontend changes

**`SignInForm.tsx`** — Two-step flow: call `/api/auth/login` first for rate limit check, then `signIn("credentials")` on success. Handle 429 by showing error message from response body in the existing red error banner.

**`RegisterForm.tsx`** — Add 429 handling to existing fetch error logic (check `response.status === 429` before parsing JSON).

**`ForgotPasswordForm.tsx`** — Add 429 handling to existing fetch error logic.

**`ResetPasswordForm.tsx`** — Add 429 handling to existing fetch error logic.

All 429 errors display via the existing error banner pattern (red text above form), consistent with how other errors are shown on these pages.

### Error response format

All rate-limited responses return:

```
HTTP 429 Too Many Requests
Retry-After: <seconds-until-reset>

{ "error": "Too many attempts. Please try again in X minutes." }
```

The `X minutes` value is computed from the `reset` timestamp: `Math.ceil((reset - Date.now()) / 1000)` converted to minutes for the user-facing message.

### Fail-open behavior

If Upstash is unavailable (network error, misconfigured credentials, service down), the `checkRateLimit` wrapper catches the error, logs a warning, and returns `{ success: true }`. Auth functionality is never blocked by rate limiting infrastructure failure.

### Development behavior

In local development, all requests resolve to IP `127.0.0.1`, meaning all rate limit buckets are shared. This is fine for dev — rate limits are generous enough that normal development is unaffected. If it becomes an issue, developers can skip rate limiting by not setting the Upstash env vars (the fail-open behavior will allow all requests through).

### Existing token-based rate limits

The 60-second checks in `verification.ts` (`checkResetRateLimit`, `checkResendRateLimit`) remain as a secondary defense layer. Upstash is the primary gate; these provide fallback protection if Upstash is unavailable.

## Files Changed

| File | Action |
|------|--------|
| `src/lib/rate-limit.ts` | Create |
| `src/app/api/auth/login/route.ts` | Create |
| `src/app/api/auth/register/route.ts` | Modify |
| `src/app/api/auth/forgot-password/route.ts` | Modify |
| `src/app/api/auth/reset-password/route.ts` | Modify |
| `src/app/api/auth/resend-verification/route.ts` | Modify |
| `src/components/auth/SignInForm.tsx` | Modify |
| `src/components/auth/RegisterForm.tsx` | Modify |
| `src/components/auth/ForgotPasswordForm.tsx` | Modify |
| `src/components/auth/ResetPasswordForm.tsx` | Modify |

## Out of Scope

- Middleware-based rate limiting (would close the direct NextAuth callback bypass)
- Rate limiting `change-password` and `delete-account` (authenticated endpoints — lower risk, can be added later)
- Rate limiting `verify-email` (tokens are 256-bit, brute force is infeasible)
- Rate limiting non-auth endpoints
- Admin dashboard for rate limit monitoring
- IP allowlisting/blocklisting
- Disabling rate limiting per environment (fail-open with missing env vars handles dev)
