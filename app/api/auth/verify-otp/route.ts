export const runtime = "nodejs"; // ✅ VERY IMPORTANT

import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email },
      data: { otp: null, otpExpiry: null },
    });

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ success: true });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;

  } catch (error) {
    console.error("verify-otp error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}