import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

// Server component
export default async function CoursesPage() {
  // Fetch courses from the database
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">
              {course.description.length > 100
                ? course.description.slice(0, 100) + "..."
                : course.description}
            </p>
            <p className="font-bold mb-4">${course.price.toFixed(2)}</p>
            <Link
              href={`/courses/${course.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}