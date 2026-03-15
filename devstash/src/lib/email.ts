import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "onboarding@resend.dev";

interface SendVerificationEmailParams {
  email: string;
  token: string;
}

async function sendVerificationEmail({ email, token }: SendVerificationEmailParams): Promise<void> {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your DevStash email",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Verify your email</h1>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
          Click the button below to verify your email address and activate your DevStash account.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 6px;">
          Verify Email
        </a>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 32px; line-height: 1.5;">
          If you didn't create a DevStash account, you can safely ignore this email.
          This link expires in 24 hours.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}

async function sendPasswordResetEmail({ email, token }: SendVerificationEmailParams): Promise<void> {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your DevStash password",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Reset your password</h1>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
          We received a request to reset your password. Click the button below to choose a new one.
        </p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 6px;">
          Reset Password
        </a>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 32px; line-height: 1.5;">
          If you didn't request a password reset, you can safely ignore this email.
          This link expires in 1 hour.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}

export { sendVerificationEmail, sendPasswordResetEmail };
