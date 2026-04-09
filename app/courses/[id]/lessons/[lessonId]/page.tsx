import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  // ✅ unwrap params (Next.js latest)
  const resolvedParams = await params;

  const courseId = Number(resolvedParams.id);
  const lessonId = Number(resolvedParams.lessonId);

  if (!courseId || !lessonId) {
    return <div>Invalid request</div>;
  }

  // ✅ auth check
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login");
  }

  // ✅ check enrollment
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: user.userId,
      courseId: courseId,
    },
  });

  if (!enrollment) {
    return <div className="p-10 text-center">You are not enrolled in this course</div>;
  }

  // ✅ fetch lesson
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  // ✅ check completion
  const completion = await prisma.lessonCompletion.findFirst({
    where: {
      lessonId: lessonId,
      enrollmentId: enrollment.id,
    },
  });

  const isCompleted = completion?.completed || false;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

      {/* Content */}
      <p className="text-gray-700 mb-6">{lesson.content}</p>

      {/* ✅ Mark Complete Button */}
      <form action={`/api/lesson/complete`} method="POST">
        <input type="hidden" name="lessonId" value={lessonId} />
        <input type="hidden" name="enrollmentId" value={enrollment.id} />

        <button
          className={`px-4 py-2 rounded ${
            isCompleted
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {isCompleted ? "Completed ✅" : "Mark as Complete"}
        </button>
      </form>
    </div>
  );
}