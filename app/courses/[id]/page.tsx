import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";

const prisma = new PrismaClient();

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params (new Next.js)
  const resolvedParams = await params;
  const courseId = Number(resolvedParams.id);

  if (!courseId || isNaN(courseId)) {
    return <div className="p-10 text-center">Invalid course ID</div>;
  }

  // ✅ get user
  const user = await getUserFromToken();

  // ✅ fetch course
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        include: { lessons: true },
      },
    },
  });

  if (!course) {
    return <div className="p-10 text-center">Course not found</div>;
  }

  // ✅ check enrollment
  let isEnrolled = false;

  if (user) {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.userId,
        courseId,
      },
    });

    isEnrolled = !!enrollment;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600 mt-2">{course.description}</p>

      {/* ✅ AUTH + ENROLL LOGIC */}
      <div className="mt-6">
        {!user ? (
          // ❌ Not logged in
          <Link
            href="/login"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Log in to Enroll
          </Link>
        ) : isEnrolled ? (
          // ✅ Already enrolled
          <Link
            href={`/courses/${courseId}/lessons/${course.chapters[0]?.lessons[0]?.id}`}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Continue Learning
          </Link>
        ) : (
          // ✅ Not enrolled
          <form action={`/api/enroll/${courseId}`} method="POST">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Enroll
            </button>
          </form>
        )}
      </div>

      {/* Chapters + Lessons */}
      <div className="mt-8">
        {course.chapters.map((chapter) => (
          <div key={chapter.id} className="mb-6">
            <h2 className="text-xl font-semibold">{chapter.title}</h2>

            <ul className="ml-5 list-disc">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}