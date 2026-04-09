
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const lessonId = Number(formData.get("lessonId"));
  const enrollmentId = Number(formData.get("enrollmentId"));

  if (!lessonId || !enrollmentId) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await prisma.lessonCompletion.upsert({
    where: { lessonId_enrollmentId: { lessonId, enrollmentId } },
    update: { completed: true },
    create: { lessonId, enrollmentId, completed: true },
  });

  const currentLesson = await prisma.lesson.findUnique({ where: { id: lessonId } });

  const nextLesson = await prisma.lesson.findFirst({
    where: { chapterId: currentLesson!.chapterId, id: { gt: lessonId } },
    orderBy: { id: "asc" },
  });

  return NextResponse.json({
    success: true,
    nextLessonId: nextLesson?.id || null
  });
}