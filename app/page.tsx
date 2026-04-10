// app/page.tsx
"use client";

import {
  User,
  LogIn,
  BookOpen,
  BarChart2,
  Target,
  BookOpenCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  {
    icon: <Target size={28} className="text-blue-400" />,
    title: "Placement-Ready Content",
    desc: "Curated topics aligned with what top companies actually test — DSA, system design, aptitude, and core CS fundamentals. Every lesson is built to get you hired.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
  },
  {
    icon: <BookOpenCheck size={28} className="text-blue-400" />,
    title: "Chapter-Wise Structured Courses",
    desc: "Courses broken into clean chapters with detailed lessons inside each. No jumping around — just a clear path from beginner to confident.",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
  },
  {
    icon: <Zap size={28} className="text-blue-400" />,
    title: "Modern & Regularly Updated",
    desc: "Content stays current with the industry. New tools, frameworks, and interview patterns are added continuously so you're never learning outdated material.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  },
  {
    icon: <BarChart2 size={28} className="text-blue-400" />,
    title: "Track Your Learning",
    desc: "See exactly where you are. Mark lessons complete, view progress per course, and keep your learning structured so nothing slips through the cracks.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
];

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
        <h4 className="text-xl font-bold text-white">Learnhub</h4>
        <div className="flex gap-3">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-blue-200/60 text-white bg-transparent hover:bg-blue-950/40 hover:text-white transition"
            >
              <LogIn size={16} className="mr-1" />
              Login
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              className="font-semibold transition"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)" }}
            >
              <BookOpen size={16} className="mr-1" />
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div
        className="flex flex-col items-center justify-center px-4 text-center pt-20 pb-16"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 65%)",
        }}
      >
        <div className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-blue-700/40 bg-blue-950/30">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-700/50 rounded-full">
            New
          </span>
          <span className="text-sm text-white font-medium">Learn at your own pace</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-bold text-white mb-2 leading-tight">
          Forget Scattered Tutorials.
        </h1>
        <h1 className="text-3xl sm:text-6xl font-bold bg-gradient-to-r from-blue-300 to-blue-800 bg-clip-text text-transparent leading-tight">
          Get Structured Learning
        </h1>

        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-md">
          Your all-in-one platform for courses, progress tracking, and real skills.
        </p>

        <div className="flex gap-4 mt-8">
          <Link href="/courses">
            <Button
              className="font-bold px-7 py-5 text-sm transition"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)" }}
            >
              Explore Courses
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-blue-700/50 text-white bg-transparent hover:bg-blue-950/40 px-7 py-5 text-sm"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Images Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto px-6 mt-4 mb-20">
        {[
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
          "https://img.pikbest.com/backgrounds/20250128/e-learning-concept-with-digital-education-icons-and-online-course-platform_11462961.jpg!bwr800",
        ].map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl h-36 border border-blue-700/20"
            style={{ boxShadow: "0 0 0 1px rgba(37,99,235,0.1), 0 8px 30px rgba(37,99,235,0.1)" }}
          >
            <img
              src={src}
              alt={`Feature ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 opacity-80 hover:opacity-100"
            />
          </div>
        ))}
      </div>

      {/* 4 Feature Cards */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-white mb-1 text-center">What do we have?</h2>
        <p className="text-white text-4xl text-center mb-10">Everything you need to go from zero to job-ready.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((item, idx) => (
            <Card
              key={idx}
              className="rounded-2xl overflow-hidden text-white border border-gray-700/20 hover:scale-[1.01]"
              style={{
              background: "linear-gradient(to bottom, #111827, #000000)",
                boxShadow:
                  "0 0 0 1px rgba(37,99,235,0.12), 0 20px 50px rgba(37,99,235,0.1)",
              }}
            >
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2 pt-5">
                <div className="mb-2">{item.icon}</div>
                <CardTitle className="text-base font-semibold text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-base font-semibold text-white">Learnhub</h3>
            <p className="text-sm text-gray-600 mt-1">Structured learning, beautifully delivered.</p>
          </div>
          <div className="flex gap-5 text-sm text-gray-600">
            <Link href="/about" className="hover:text-blue-400 transition">About</Link>
            <Link href="/privacy" className="hover:text-blue-400 transition">Privacy</Link>
            <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </div>
          <div className="text-sm text-gray-700">
            © {new Date().getFullYear()} Learnhub. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}