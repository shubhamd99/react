/**
 * Feature flags derived from environment variables.
 *
 * EMAIL_VERIFICATION — controls the email verification flow for credentials users.
 * Set NEXT_PUBLIC_EMAIL_VERIFICATION=true to enable. Defaults to false.
 */
export const EMAIL_VERIFICATION_ENABLED =
  process.env.NEXT_PUBLIC_EMAIL_VERIFICATION === "true";
