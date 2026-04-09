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

  // ✅ upsert completion
  await prisma.lessonCompletion.upsert({
    where: {
      lessonId_enrollmentId_unique: {
        lessonId,
        enrollmentId,
      },
    },
    update: {
      completed: true,
    },
    create: {
      lessonId,
      enrollmentId,
      completed: true,
    },
  });

  return NextResponse.redirect(
    new URL(`/courses`, req.url)
  );
}