import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  PlayCircle,
  LayoutList,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const prisma = new PrismaClient();

export default async function DashboardPage() {
 
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: parseInt(user.userId),
    },
    include: {
      course: {
        include: {
          chapters: {
            include: {
              lessons: true,
            },
          },
        },
      },
      completions: true,
    },
  });

  const displayName =
    (user as any).name ||
    (user as any).username ||
    (user as any).email?.split("@")[0] ||
    "Learner";

  return (
    <div className="min-h-screen text-white" style={{ background: "#000" }}>
     
      <div className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-12">
        
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <span>Dashboard</span>
            <ChevronRight size={13} />
            <span className="text-blue-400">My Courses</span>
          </div>

        
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-blue-400 text-sm font-medium mb-1 tracking-wide uppercase">
                Welcome back
              </p>
              <h1 className="text-4xl font-bold text-white">
                {displayName}
              </h1>
              <p className="text-gray-400 mt-2 text-sm">
                Track your progress across all enrolled courses.
              </p>
            </div>

           
            <div className="flex items-center gap-4 flex-wrap">
       
              <Link
                href="/courses"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition border border-blue-700/40 hover:bg-blue-950/40"
              >
                Browse Courses
                <ChevronRight size={15} />
              </Link>

             
              <div className="flex gap-4">
                <div
                  className="rounded-xl px-5 py-4 border border-blue-700/20 text-center"
                  style={{ background: "rgba(30,58,138,0.15)" }}
                >
                  <p className="text-2xl font-bold text-white">
                    {enrollments.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Courses</p>
                </div>

                <div
                  className="rounded-xl px-5 py-4 border border-blue-700/20 text-center"
                  style={{ background: "rgba(30,58,138,0.15)" }}
                >
                  <p className="text-2xl font-bold text-white">
                    {enrollments.reduce(
                      (acc, e) =>
                        acc + e.completions.filter((c) => c.completed).length,
                      0
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Lessons Done
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-5xl mx-auto px-6 py-12">
        {enrollments.length === 0 ? (
          <div
            className="rounded-2xl border border-blue-700/20 p-14 text-center"
            style={{
              background:
                "linear-gradient(160deg, #0a0e1a 0%, #080c14 100%)",
            }}
          >
            <GraduationCap
              size={40}
              className="text-blue-500 mx-auto mb-4 opacity-60"
            />
            <p className="text-white font-semibold text-lg mb-1">
              No courses yet
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Enroll in a course to start learning.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition"
              style={{
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
              }}
            >
              Browse Courses
              <ChevronRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-6">
              Enrolled Courses — {enrollments.length}
            </h2>

            {enrollments.map((enrollment) => {
              const course = enrollment.course;

              const totalLessons = course.chapters.reduce(
                (acc, chapter) => acc + chapter.lessons.length,
                0
              );

              const completedLessons = enrollment.completions.filter(
                (c) => c.completed
              ).length;

              const progressPercent =
                totalLessons === 0
                  ? 0
                  : Math.round((completedLessons / totalLessons) * 100);

              const isFinished = progressPercent === 100;

              const firstLessonId =
                course.chapters[0]?.lessons[0]?.id;

              return (
                <div
                  key={enrollment.id}
                  className="rounded-2xl border border-blue-700/20 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center transition hover:border-blue-600/40 group"
                  style={{
                    background:
                      "linear-gradient(160deg, #0a0e1a 0%, #080c14 100%)",
                  }}
                >
            
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-blue-700/40"
                    style={{ background: "rgba(30,58,138,0.25)" }}
                  >
                    {isFinished ? (
                      <CheckCircle2
                        size={22}
                        className="text-blue-400"
                      />
                    ) : (
                      <BookOpen
                        size={22}
                        className="text-blue-400"
                      />
                    )}
                  </div>

             
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-semibold text-base group-hover:text-blue-300 transition truncate">
                        {course.title}
                      </h3>
                      {isFinished && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-700/50">
                          Completed
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <LayoutList
                          size={12}
                          className="text-blue-500"
                        />
                        {course.chapters.length} chapters
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen
                          size={12}
                          className="text-blue-500"
                        />
                        {completedLessons} of {totalLessons} lessons
                      </span>
                    </div>

                 
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPercent}%`,
                          background: isFinished
                            ? "linear-gradient(90deg, #1d4ed8, #60a5fa)"
                            : "linear-gradient(90deg, #1e40af, #3b82f6)",
                        }}
                      />
                    </div>

                    <p className="text-xs text-gray-400 mt-1.5">
                      {progressPercent}% complete
                    </p>
                  </div>

               
                  <Link
                    href={`/courses/${course.id}/lessons/${firstLessonId}`}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-blue-700/40 hover:bg-blue-950/40 transition"
                  >
                    <PlayCircle
                      size={15}
                      className="text-blue-400"
                    />
                    {completedLessons === 0
                      ? "Start"
                      : isFinished
                      ? "Review"
                      : "Continue"}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}