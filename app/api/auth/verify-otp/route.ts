import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, otp } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.otp !== otp || user.otpExpiry! < new Date()) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  const res = NextResponse.json({ success: true })

  res.cookies.set("token", token, {
    httpOnly: true,
  })

  return res
}