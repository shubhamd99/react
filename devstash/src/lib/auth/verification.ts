import crypto from "crypto";
import { prisma } from "@/lib/db";

const TOKEN_EXPIRY_HOURS = 24;
const RATE_LIMIT_SECONDS = 60;

async function generateVerificationToken(email: string): Promise<string> {
  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

interface ValidateResult {
  success: boolean;
  error?: string;
  email?: string;
}

async function validateVerificationToken(token: string): Promise<ValidateResult> {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return { success: false, error: "Invalid or expired token" };
  }

  const isExpired = new Date() > verificationToken.expires;

  if (isExpired) {
    await prisma.verificationToken.delete({
      where: { token },
    });
    return { success: false, error: "Token expired. Please request a new verification email." };
  }

  // Verify the user
  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { emailVerified: new Date() },
  });

  // Delete the used token
  await prisma.verificationToken.delete({
    where: { token },
  });

  // Cleanup: delete any other expired tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: verificationToken.identifier,
      expires: { lt: new Date() },
    },
  });

  return { success: true, email: verificationToken.identifier };
}

async function checkResendRateLimit(email: string): Promise<boolean> {
  const latestToken = await prisma.verificationToken.findFirst({
    where: { identifier: email },
    orderBy: { expires: "desc" },
  });

  if (!latestToken) return true;

  // Derive creation time: expires - 24h
  const createdAt = new Date(latestToken.expires.getTime() - TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  const secondsSinceCreation = (Date.now() - createdAt.getTime()) / 1000;

  return secondsSinceCreation >= RATE_LIMIT_SECONDS;
}

const RESET_TOKEN_EXPIRY_HOURS = 1;
const RESET_IDENTIFIER_PREFIX = "reset:";

async function generatePasswordResetToken(email: string): Promise<string> {
  const identifier = `${RESET_IDENTIFIER_PREFIX}${email}`;

  // Delete any existing reset tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier },
  });

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  });

  return token;
}

interface ResetValidateResult {
  success: boolean;
  error?: string;
  email?: string;
}

async function validatePasswordResetToken(token: string): Promise<ResetValidateResult> {
  const resetToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!resetToken || !resetToken.identifier.startsWith(RESET_IDENTIFIER_PREFIX)) {
    return { success: false, error: "Invalid or expired reset link" };
  }

  const isExpired = new Date() > resetToken.expires;

  if (isExpired) {
    await prisma.verificationToken.delete({ where: { token } });
    return { success: false, error: "Reset link has expired. Please request a new one." };
  }

  const email = resetToken.identifier.slice(RESET_IDENTIFIER_PREFIX.length);

  // Delete the used token (single-use)
  await prisma.verificationToken.delete({ where: { token } });

  // Cleanup expired reset tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: resetToken.identifier,
      expires: { lt: new Date() },
    },
  });

  return { success: true, email };
}

async function checkResetRateLimit(email: string): Promise<boolean> {
  const identifier = `${RESET_IDENTIFIER_PREFIX}${email}`;

  const latestToken = await prisma.verificationToken.findFirst({
    where: { identifier },
    orderBy: { expires: "desc" },
  });

  if (!latestToken) return true;

  // Derive creation time: expires - 1h
  const createdAt = new Date(latestToken.expires.getTime() - RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  const secondsSinceCreation = (Date.now() - createdAt.getTime()) / 1000;

  return secondsSinceCreation >= RATE_LIMIT_SECONDS;
}

export {
  generateVerificationToken,
  validateVerificationToken,
  checkResendRateLimit,
  generatePasswordResetToken,
  validatePasswordResetToken,
  checkResetRateLimit,
};
