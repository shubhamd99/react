import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generatePasswordResetToken, checkResetRateLimit } from "@/lib/auth/verification";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit, getIP, forgotPasswordLimiter, rateLimitResponse } from "@/lib/rate-limit";

const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

const GENERIC_SUCCESS = {
  success: true,
  message: "If an account exists with that email, a reset link has been sent.",
};

export async function POST(request: Request) {
  try {
    // Rate limit check (before any business logic for enumeration prevention)
    const ip = getIP(request);
    const rl = await checkRateLimit(forgotPasswordLimiter, ip);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await request.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Look up user — must have a password (not OAuth-only)
    const user = await prisma.user.findUnique({
      where: { email },
      select: { hashedPassword: true },
    });

    // Always return generic success to prevent user enumeration
    if (!user || !user.hashedPassword) {
      return NextResponse.json(GENERIC_SUCCESS);
    }

    // Rate limit check
    const canSend = await checkResetRateLimit(email);
    if (!canSend) {
      return NextResponse.json(
        { success: false, error: "Please wait before requesting another reset email" },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const token = await generatePasswordResetToken(email);

    try {
      await sendPasswordResetEmail({ email, token });
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to send reset email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(GENERIC_SUCCESS);
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
