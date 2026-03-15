import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { validatePasswordResetToken } from "@/lib/auth/verification";

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { token, password } = result.data;

    // Validate token and get email
    const validation = await validatePasswordResetToken(token);

    if (!validation.success || !validation.email) {
      return NextResponse.json(
        { success: false, error: validation.error ?? "Invalid or expired reset link" },
        { status: 400 }
      );
    }

    // Hash new password, update user, and invalidate all existing sessions
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { email: validation.email },
      data: {
        hashedPassword,
        tokenInvalidBefore: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now sign in.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
