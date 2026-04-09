import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
    },
  });

  // Dynamic courses
  const courseTitles = [
    "Complete MERN Stack Development Bootcamp",
    "Data Structures & Algorithms Mastery",
    "Frontend Development with React",
    "Backend Development with Node.js",
    "Database Design & PostgreSQL",
    "System Design for Beginners",
    "JavaScript Deep Dive",
    "API Development & Testing",
    "Authentication & Security",
    "Docker & Deployment"
  ];

  for (let index = 0; index < courseTitles.length; index++) {
    const courseTitle = courseTitles[index];

    await prisma.course.create({
      data: {
        title: courseTitle,
        description: `Comprehensive course on ${courseTitle} with real-world examples.`,
        price: 29.99 + index * 5,

        chapters: {
          create: Array.from({ length: 10 }, (_, i) => ({
            title: `Chapter ${i + 1}: ${courseTitle} Topic ${i + 1}`,

            lessons: {
              create: Array.from({ length: 5 }, (_, j) => ({
                title: `Lesson ${j + 1}: Concept ${j + 1}`,
                content: `
1. This lesson introduces concept ${j + 1} in chapter ${i + 1}.
2. Explanation starts from fundamentals.
3. Real-world examples are included.
4. Code demonstrations are provided.
5. Best practices are discussed.
6. Common mistakes are highlighted.
7. Performance tips are explained.
8. Debugging strategies are shared.
9. Practice exercises are suggested.
10. You will gain confidence in this topic.
                `,
              })),
            },
          })),
        },
      },
    });
  }

  console.log("✅ Seeded all courses successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });