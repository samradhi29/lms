"use client"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)

  const sendOtp = async () => {
    await fetch("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
    setStep(2)
  }

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    })

    if (res.ok) {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="flex flex-col gap-4 p-10">
      {step === 1 && (
        <>
          <input
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2"
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  )
}