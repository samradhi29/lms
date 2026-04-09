
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  CircleDot,
  ChevronRight,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

const prisma = new PrismaClient();

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const resolvedParams = await params;
  const courseId = parseInt(resolvedParams.id, 10);
  const lessonId = parseInt(resolvedParams.lessonId, 10);

  if (isNaN(courseId) || isNaN(lessonId)) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Card className="bg-blue-950/30 border border-blue-700/40 rounded-2xl px-10 py-8 text-center">
          <p className="text-blue-300 text-lg font-semibold">Invalid request.</p>
        </Card>
      </div>
    );
  }

  const user = await getUserFromToken();
  if (!user) redirect("/login");

  const enrollment = await prisma.enrollment.findFirst({
    where: { userId: parseInt(user.userId, 10), courseId },
  });

  if (!enrollment) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Card className="bg-blue-950/30 border border-blue-700/40 rounded-2xl px-10 py-8 text-center">
          <p className="text-blue-300 text-lg font-semibold">You are not enrolled in this course.</p>
          <Link href="/courses">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6">
              Browse Courses
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });

  if (!lesson) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Card className="bg-blue-950/30 border border-blue-700/40 rounded-2xl px-10 py-8 text-center">
          <p className="text-blue-300 text-lg font-semibold">Lesson not found.</p>
        </Card>
      </div>
    );
  }

  const completion = await prisma.lessonCompletion.findFirst({
    where: { lessonId, enrollmentId: enrollment.id },
  });

  const isCompleted = completion?.completed || false;


  async function markComplete() {
    "use server";
    await prisma.lessonCompletion.upsert({
      where: { lessonId_enrollmentId: { lessonId, enrollmentId: enrollment!.id } },
      update: { completed: true },
      create: { lessonId, enrollmentId: enrollment!.id, completed: true },
    });
    redirect(`/courses/${courseId}`);
  }

  return (
    <div className="bg-black min-h-screen text-white">

   
      <div className="bg-gradient-to-br from-blue-950 to-black border-b border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-400/70">
            <Link href={`/courses/${courseId}`} className="hover:text-blue-300 transition flex items-center gap-1.5">
              <ArrowLeft size={14} />
              <span>Back to Course</span>
            </Link>
            <ChevronRight size={13} className="text-blue-900" />
            <span className="text-blue-300/80 truncate max-w-[220px] text-xs">{lesson.title}</span>
          </div>

          {isCompleted ? (
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-600/50 rounded-full px-3 py-1 text-xs flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Completed
            </Badge>
          ) : (
            <Badge className="bg-blue-500/20 text-blue-400 border border-blue-700 rounded-full px-3 py-1 text-xs flex items-center gap-1.5">
              <CircleDot size={12} /> In Progress
            </Badge>
          )}
        </div>
      </div>

     
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-blue-400" />
          <span className="text-xs text-blue-400 uppercase tracking-widest font-medium">Lesson</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
          {lesson.title}
        </h1>

        <Separator className="bg-blue-900/40 my-6" />

        <Card className="bg-gradient-to-br from-blue-950 to-black border border-blue-900/50 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.08)] mb-8">
          <CardContent className="px-8 py-8">
            <p className="text-gray-300 text-base leading-8 whitespace-pre-wrap">{lesson.content}</p>
          </CardContent>
        </Card>

        <Separator className="bg-blue-900/30 mb-8" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-500">
            {isCompleted ? "You have completed this lesson." : "Done reading? Mark this lesson as complete."}
          </p>

        
          <form action={markComplete}>
            {isCompleted ? (
              <Button
                type="submit"
                disabled
                className="flex items-center gap-2 rounded-xl px-6 py-5 text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-600/50 cursor-not-allowed opacity-80"
              >
                <CheckCircle2 size={16} /> Completed
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex items-center gap-2 rounded-xl px-6 py-5 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all"
              >
                <CircleDot size={16} /> Mark as Complete
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}