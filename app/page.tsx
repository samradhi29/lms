// app/page.tsx
import { User, LogIn, BookOpen, BarChart2, CreditCard, Shield, Server, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "./components/ui/button";

const marqueeItems = [
  { icon: <BookOpen size={20} />, title: "Course Catalog", quote: "Browse structured courses" },
  { icon: <BarChart2 size={20} />, title: "Progress Tracking", quote: "Monitor lesson completion" },
  { icon: <User size={20} />, title: "Enrollment", quote: "Enroll with one click" },
  { icon: <BarChart2 size={20} />, title: "Dashboard", quote: "Your personal hub" },
  { icon: <CreditCard size={20} />, title: "Stripe Checkout", quote: "Secure payments" },
  { icon: <Shield size={20} />, title: "Auth & Security", quote: "Protected routes" },
];

const features = [
  { title: "Role-Based Access", desc: "Admins and students get personalized dashboards and controls." },
  { title: "Stripe Checkout", desc: "Secure test-mode payments with webhook-triggered enrollment." },
  { title: "Progress Tracking", desc: "Lesson-by-lesson completion with clear visual indicators." },
  { title: "Bot Protection", desc: "Arcjet rate limiting on login and enrollment endpoints." },
  { title: "Server Rendering", desc: "Course catalogue is fully server-rendered for SEO performance." },
  { title: "Auth Middleware", desc: "Dashboard is protected — unauthenticated users are redirected." },
  { title: "DAL Pattern", desc: "Business logic lives in the data access layer, not UI components." },
  { title: "GitHub OAuth", desc: "One-click login via GitHub. OTP email support included." },
  { title: "Smart Schema", desc: "Postgres schema: User → Course → Chapter → Lesson → Enrollment." },
];

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4">
        <h4 className="text-xl text-white">Learnopia</h4>
        <div className="flex gap-3">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black transition"
            >
              <LogIn size={16} className="mr-1" />
              Login
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black transition"
            >
              <BookOpen size={16} className="mr-1" />
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center px-4 text-center mt-10">
        <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-gray-700 shadow-md">
          <span className="px-3 py-1 text-sm font-medium bg-emerald-500 text-black rounded-full">
            New
          </span>
          <span className="text-sm text-blue-400 font-medium">Learn at your own pace</span>
        </div>

        <h1 className="text-2xl sm:text-6xl font-bold text-white mb-2">
          Forget Scattered Tutorials.
        </h1>
        <h1 className="text-2xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Get Structured Learning
        </h1>

        <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-md">
          Your all-in-one platform for courses, progress tracking, and real skills.
        </p>

        <div className="flex gap-4 mt-8">
          <Link href="/courses">
            <Button className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold px-6 py-2">
              Explore Courses
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-gray-600 text-white bg-transparent hover:bg-gray-800"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Image / Feature Grid */}
      <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto p-6 mt-10">
        {[
          { label: "Course Catalogue", color: "from-blue-900 to-blue-800" },
          { label: "Progress Tracker", color: "from-emerald-900 to-emerald-800" },
          { label: "Live Lessons", color: "from-purple-900 to-purple-800" },
          { label: "Certificates", color: "from-amber-900 to-amber-800" },
        ].map((item, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-xl shadow-lg bg-gradient-to-br ${item.color} h-28 flex items-center justify-center border border-gray-700`}
          >
            <span className="text-white font-semibold text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className="text-center mt-16 mb-4 text-2xl font-semibold tracking-widest text-amber-100">
        What Do We Have?
      </div>

      <div className="overflow-hidden whitespace-nowrap">
        {/* 
          Tailwind config — add to tailwind.config.ts:
          animation: { marquee: 'marquee 20s linear infinite' },
          keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } }
        */}
        <div className="flex gap-6 px-6 animate-marquee w-max">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={index}
              className="min-w-[200px] bg-black border-2 border-gray-500 text-white p-4 rounded-xl hover:scale-105 transition-transform"
            >
              <div className="mb-2 text-blue-400">{item.icon}</div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="bg-black text-white py-16 px-4 sm:px-8">
        <h2 className="text-amber-100 text-3xl sm:text-4xl font-semibold tracking-widest text-center mb-12">
          What Makes Us Different?
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-bl from-black to-zinc-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-300">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6 mt-10 border-t-2 border-gray-600">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Learnopia</h3>
            <p className="text-sm text-gray-400 mt-1">Structured learning, beautifully delivered.</p>
          </div>

          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Learnopia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}