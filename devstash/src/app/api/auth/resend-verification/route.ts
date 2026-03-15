import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateVerificationToken, checkResendRateLimit } from "@/lib/auth/verification";
import { sendVerificationEmail } from "@/lib/email";

const resendSchema = z.object({
  email: z.email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = resendSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Look up user — generic success if not found or already verified (prevent enumeration)
    const user = await prisma.user.findUnique({
      where: { email },
      select: { emailVerified: true, hashedPassword: true },
    });

    if (!user || user.emailVerified || !user.hashedPassword) {
      return NextResponse.json({ success: true });
    }

    // Rate limit check
    const canResend = await checkResendRateLimit(email);
    if (!canResend) {
      return NextResponse.json(
        { success: false, error: "Please wait before requesting another email" },
        { status: 429 }
      );
    }

    const token = await generateVerificationToken(email);
    await sendVerificationEmail({ email, token });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
