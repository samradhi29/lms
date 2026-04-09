import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("user found:", !!user);
  console.log("otp match:", user?.otp === otp);
  console.log("otp expired:", user?.otpExpiry! < new Date());

  if (!user || user.otp !== otp || user.otpExpiry! < new Date()) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email },
    data: { otp: null, otpExpiry: null },
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  console.log("token generated:", !!token);
  console.log("JWT_SECRET defined:", !!process.env.JWT_SECRET);

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false, 
    maxAge: 60 * 60 * 24 * 7,
  });

  console.log("cookie set, returning response");

  return res;
}