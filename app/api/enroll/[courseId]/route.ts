import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const resolvedParams = await params;
  const courseId = Number(resolvedParams.courseId);

  if (!courseId || isNaN(courseId)) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  // ✅ get user from JWT
  const user = await getUserFromToken();

  // 🔥 ONLY CHANGE HERE
  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=/courses/${courseId}&message=Please login to enroll`, req.url)
    );
  }

  // rest stays SAME
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      userId: user.userId,
      courseId: courseId,
    },
  });

  if (!existingEnrollment) {
    await prisma.enrollment.create({
      data: {
        userId: user.userId,
        courseId: courseId,
      },
    });
  }

  return NextResponse.redirect(new URL(`/courses/${courseId}`, req.url));
}