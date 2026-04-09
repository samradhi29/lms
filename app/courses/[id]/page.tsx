// app/courses/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PlayCircle,
  Lock,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Clock,
  LayoutList,
  ShieldCheck,
} from "lucide-react";

const prisma = new PrismaClient();

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const resolvedParams = await params;
  const courseId = Number(resolvedParams.id);

  if (!courseId || isNaN(courseId)) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        <p className="text-gray-500 text-lg">Invalid course ID.</p>
      </div>
    );
  }

  
  const user = await getUserFromToken();


  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        include: { lessons: true },
      },
    },
  });

  if (!course) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        <p className="text-gray-500 text-lg">Course not found.</p>
      </div>
    );
  }

 
  let isEnrolled = false;

  if (user) {
    const enrollment = await prisma.enrollment.findFirst({
      where: { userId: Number(user.userId), courseId },
    });

    isEnrolled = !!enrollment;
  }

  const totalLessons = course.chapters.reduce(
    (acc, ch) => acc + ch.lessons.length,
    0
  );
  const firstLessonId = course.chapters[0]?.lessons[0]?.id;

  return (
    <div className="bg-[#080810] min-h-screen text-white">

      
      <div
        className="border-b border-white/5"
        style={{
          background:
            "radial-gradient(ellipse at 60% 0%, rgba(37,99,235,0.15) 0%, transparent 70%), linear-gradient(180deg, #0a0e1a 0%, #080810 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-14">

       
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/courses" className="hover:text-blue-400 transition">
              Courses
            </Link>
            <ChevronRight size={13} />
            <span className="text-gray-400 truncate max-w-xs">{course.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">

           
            <div className="flex-1">
              <Badge className="mb-5 bg-blue-950/70 text-blue-400 border border-blue-700/60 rounded-full px-3 py-1 text-xs tracking-wide">
                Online Course
              </Badge>

              <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 text-white">
                {course.title}
              </h1>

              <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8">
                {course.description}
              </p>

             
              <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <LayoutList size={15} className="text-blue-400" />
                  <span>{course.chapters.length} chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={15} className="text-blue-400" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-blue-400" />
                  <span>Self-paced</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-blue-400" />
                  <span>Certificate included</span>
                </div>
              </div>
            </div>

        
            <div
              className="w-full lg:w-80 rounded-2xl p-6 shrink-0 border border-blue-700/30"
              style={{
                background:
                  "linear-gradient(160deg, #0a0e1a 0%, #080c16 100%)",
                boxShadow:
                  "0 0 0 1px rgba(37,99,235,0.15), 0 20px 60px rgba(37,99,235,0.12)",
              }}
            >
              <p className="text-4xl font-bold text-white mb-1">
                ${course.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-600 mb-6 uppercase tracking-widest">
                One-time payment
              </p>

              <Separator className="bg-white/5 mb-6" />

              {!user ? (
                <Link href="/login" className="w-full block">
                  <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-700 font-bold rounded-xl py-5 text-sm flex items-center justify-center gap-2 transition">
                    <GraduationCap size={17} />
                    Log in to Enroll
                  </Button>
                </Link>
              ) : isEnrolled ? (
                <Link
                  href={`/courses/${courseId}/lessons/${firstLessonId}`}
                  className="w-full block"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-5 text-sm flex items-center justify-center gap-2 transition">
                    <PlayCircle size={17} />
                    Continue Learning
                  </Button>
                </Link>
              ) : (
                <form action={`/api/enroll/${courseId}`} method="POST">
                  <Button
                    type="submit"
                    className="w-full font-bold rounded-xl py-5 text-sm flex items-center justify-center gap-2 transition"
                    style={{
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                    }}
                  >
                    <GraduationCap size={17} />
                    Enroll Now
                  </Button>
                </form>
              )}

              <ul className="mt-6 space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <ShieldCheck size={13} className="text-blue-500 shrink-0" />
                  Lifetime access
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen size={13} className="text-blue-500 shrink-0" />
                  {totalLessons} structured lessons
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap size={13} className="text-blue-500 shrink-0" />
                  Certificate on completion
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={13} className="text-blue-500 shrink-0" />
                  Learn at your own pace
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-white mb-1">Course Curriculum</h2>
        <p className="text-gray-600 text-sm mb-10">
          {course.chapters.length} chapters · {totalLessons} lessons
        </p>

        <Accordion type="multiple" className="space-y-3">
          {course.chapters.map((chapter, chIdx) => (
            <AccordionItem
              key={chapter.id}
              value={`chapter-${chapter.id}`}
              className="rounded-xl overflow-hidden border border-blue-700/20 px-0"
              style={{
                background: "linear-gradient(160deg, #0a0e1a 0%, #080c14 100%)",
              }}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-950/20 transition group">
                <div className="flex items-center gap-4 text-left w-full">
                  <div className="w-8 h-8 rounded-full border border-blue-700/60 bg-blue-950/60 flex items-center justify-center text-blue-400 text-sm font-bold shrink-0">
                    {chIdx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm group-hover:text-blue-300 transition">
                      {chapter.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {chapter.lessons.length} lessons
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-5 pt-0">
                <Separator className="bg-white/5 mb-4" />
                <ul className="space-y-1">
                  {chapter.lessons.map((lesson, lIdx) => (
                    <li key={lesson.id}>
                      {isEnrolled ? (
                        <Link
                          href={`/courses/${course.id}/lessons/${lesson.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-950/30 transition group"
                        >
                          <PlayCircle
                            size={16}
                            className="text-blue-500 shrink-0 group-hover:text-blue-300 transition"
                          />
                          <span className="text-sm text-gray-400 group-hover:text-white transition">
                            {lIdx + 1}. {lesson.title}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg opacity-40 cursor-not-allowed select-none">
                          <Lock size={14} className="text-gray-600 shrink-0" />
                          <span className="text-sm text-gray-600">
                            {lIdx + 1}. {lesson.title}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>
  );
}