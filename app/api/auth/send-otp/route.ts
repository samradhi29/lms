export const runtime = "nodejs"; 
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.upsert({
      where: { email },
      update: {
        otp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      },
      create: {
        email,
        otp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    await sendOTP(email, otp);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}