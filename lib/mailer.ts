import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendOTP(email: string, otp: string) {
  await transporter.sendMail({
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  })
}