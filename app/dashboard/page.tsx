import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // ✅ Get logged-in user
  const user = await getUserFromToken();

  // ❌ Protect route
  if (!user) {
    redirect("/login");
  }

  // ✅ Fetch enrollments with course + lessons
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: user.userId,
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
      completions: true, // lesson completions
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {enrollments.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        <div className="space-y-6">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;

            // ✅ total lessons
            const totalLessons = course.chapters.reduce(
              (acc, chapter) => acc + chapter.lessons.length,
              0
            );

            // ✅ completed lessons
            const completedLessons = enrollment.completions.filter(
              (c) => c.completed
            ).length;

            return (
              <div
                key={enrollment.id}
                className="border p-4 rounded shadow"
              >
                <h2 className="text-xl font-semibold">
                  {course.title}
                </h2>

                <p className="text-gray-600">
                  {completedLessons} of {totalLessons} lessons complete
                </p>

                {/* Optional progress bar */}
                <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{
                      width: `${
                        totalLessons === 0
                          ? 0
                          : (completedLessons / totalLessons) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}