export const dynamic = "force-dynamic"; // ✅ SSR (VERY IMPORTANT)

import { prisma } from "@/lib/prisma"; // ✅ singleton
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
    },
  });

  const gradients = [
    { border: "border-black", from: "from-blue-950", badge: "bg-blue-500/20 text-blue-400 border-blue-700", accent: "text-blue-400" },
  ];

  return (
    <div className="bg-black min-h-screen text-white">

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-white/5 backdrop-blur mb-6">
          <Sparkles size={14} className="text-emerald-400" />
          <span className="text-sm text-gray-300">Explore all courses</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          <span>All </span>
          <span className="bg-clip-text text-transparent">Courses</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Hand-picked, structured learning paths built to take you from zero to job-ready.
        </p>
      </div>

      {/* Courses */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {courses.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500 text-lg">No courses available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => {
              const g = gradients[idx % gradients.length];

              return (
                <Card
                  key={course.id}
                  className={`bg-gradient-to-b ${g.from} to-black border ${g.border} rounded-2xl overflow-hidden hover:scale-[1.02] transition`}
                >
                  <CardHeader className="pb-2 pt-6 px-6">
                    <Badge className={g.badge}>Course</Badge>
                    <CardTitle className="text-white text-xl font-bold mt-2">
                      {course.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-4">
                    <p className="text-gray-400 text-sm">
                      {course.description.length > 110
                        ? course.description.slice(0, 110) + "..."
                        : course.description}
                    </p>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 flex justify-between">
                    <div>
                      <p className="text-xs text-white">Price</p>
                      <p className={`text-xl font-bold ${g.accent}`}>
                        ${course.price.toFixed(2)}
                      </p>
                    </div>

                    <Link href={`/courses/${course.id}`}>
                      <Button className="bg-black text-white">
                        View <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}