export const runtime = "nodejs"; // ✅ important

import { prisma } from "@/lib/prisma"; // ✅ singleton
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const lessonId = Number(formData.get("lessonId"));
    const enrollmentId = Number(formData.get("enrollmentId"));

    if (!lessonId || !enrollmentId) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    await prisma.lessonCompletion.upsert({
      where: {
        lessonId_enrollmentId: { lessonId, enrollmentId },
      },
      update: { completed: true },
      create: { lessonId, enrollmentId, completed: true },
    });

    const currentLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!currentLesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    const nextLesson = await prisma.lesson.findFirst({
      where: {
        chapterId: currentLesson.chapterId,
        id: { gt: lessonId },
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json({
      success: true,
      nextLessonId: nextLesson?.id || null,
    });

  } catch (error) {
    console.error("LESSON COMPLETE ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}