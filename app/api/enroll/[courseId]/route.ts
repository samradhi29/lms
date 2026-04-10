export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(
  req: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { courseId } = await context.params; 

    const parsedCourseId = Number(courseId);

    if (!parsedCourseId || isNaN(parsedCourseId)) {
      return NextResponse.json(
        { error: "Invalid courseId" },
        { status: 400 }
      );
    }

    const parsedUserId = Number(user.userId);

    if (!parsedUserId || isNaN(parsedUserId)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });

    if (!existingUser) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const existingCourse = await prisma.course.findUnique({
      where: { id: parsedCourseId },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.enrollment.findFirst({
      where: {
        userId: parsedUserId,
        courseId: parsedCourseId,
      },
    });

    if (!existing) {
      await prisma.enrollment.create({
        data: {
          userId: parsedUserId,
          courseId: parsedCourseId,
        },
      });
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));

  } catch (error) {
    console.error("ENROLL ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}