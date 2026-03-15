import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateVerificationToken } from "@/lib/auth/verification";
import { sendVerificationEmail } from "@/lib/email";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.email("Invalid email address"),
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
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Allow re-registration if user is unverified and has a password (credentials user)
      const isUnverifiedCredentialsUser =
        !existingUser.emailVerified && existingUser.hashedPassword;

      if (!isUnverifiedCredentialsUser) {
        return NextResponse.json(
          { success: false, error: "Email already registered" },
          { status: 409 }
        );
      }

      // Update unverified user's details
      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.update({
        where: { email },
        data: { name, hashedPassword },
      });
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.create({
        data: { name, email, hashedPassword },
      });
    }

    // Generate verification token and send email
    const token = await generateVerificationToken(email);

    try {
      await sendVerificationEmail({ email, token });
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Verification email sent" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
