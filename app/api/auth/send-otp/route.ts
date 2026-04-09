export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { sendOTP } from "@/lib/mailer"

export async function POST(req: Request) {
  const { email } = await req.json()

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

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
  })

  await sendOTP(email, otp)

  return NextResponse.json({ success: true })
}