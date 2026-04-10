"use client";
import { useState } from "react";
import { Mail, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
    });
    setLoading(false);
    setStep(2);
  };

  const verifyOtp = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
      credentials: "include",
    });
    setLoading(false);

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm p-8 rounded-2xl border border-blue-700/20">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl border border-blue-700/40 bg-blue-900/25">
            <ShieldCheck size={22} className="text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Sign in to LearnHub</h1>
          <p className="text-gray-400 text-sm mt-1">
            {step === 1
              ? "Enter your email to receive a one-time code."
              : `Code sent to ${email}`}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wide">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
              />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={step === 2}
                className="w-full bg-white/5 border border-blue-700/30 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>

          {step === 2 && (
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wide">
                One-time code
              </label>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                autoFocus
                className="w-full bg-white/5 border border-blue-700/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 tracking-[0.3em] transition"
              />
            </div>
          )}

          {step === 1 ? (
            <button
              onClick={sendOtp}
              disabled={!email || loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
              }}
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <>
                  Send code <ArrowRight size={15} />
                </>
              )}
            </button>
          ) : (
            <>
              <button
                onClick={verifyOtp}
                disabled={otp.length < 4 || loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                }}
              >
                {loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <>
                    Verify & sign in <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-600">
                Didn't get it?{" "}
                <button
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                  }}
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  Resend code
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}