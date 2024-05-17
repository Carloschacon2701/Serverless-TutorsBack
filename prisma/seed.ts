import { initializePrisma } from "../src/utils/prisma";

const prisma = initializePrisma();

const roles = [
  {
    id: 1,
    name: "tutor",
  },
  {
    id: 2,
    name: "student",
  },
];

const categories = [
  {
    id: 1,
    name: "Math and Physics",
  },
  {
    id: 2,
    name: "Chemistry",
  },
  {
    id: 3,
    name: "Informatics",
  },

  {
    id: 4,
    name: "Music",
  },
  {
    id: 5,
    name: "Social Studies",
  },
  {
    id: 6,
    name: "Psichology",
  },
  {
    id: 7,
    name: "Electronics",
  },
  {
    id: 8,
    name: "Environmental",
  },
  {
    id: 9,
    name: "Civil",
  },
  {
    id: 10,
    name: "Mechanical",
  },
  {
    id: 11,
    name: "Arquitecture",
  },
];

const subjects = [
  { id: 1, name: "Physics I", category_id: 1 },
  { id: 2, name: "Physics II", category_id: 1 },
  { id: 3, name: "Statistics II", category_id: 1 },
  { id: 4, name: "Discrete Mathematics", category_id: 1 },
  { id: 5, name: "Statistics I", category_id: 1 },
  { id: 6, name: "Statistics", category_id: 1 },
  { id: 7, name: "Numerical Methods", category_id: 1 },
  { id: 8, name: "Mathematics", category_id: 1 },
  { id: 9, name: "Mathematics I", category_id: 1 },
  { id: 10, name: "Mathematics II", category_id: 1 },
  { id: 11, name: "Mathematics III", category_id: 1 },
  { id: 12, name: "Mathematics IV", category_id: 1 },
  { id: 13, name: "General Chemistry I", category_id: 2 },
  { id: 14, name: "General Chemistry II", category_id: 2 },
  { id: 15, name: "Organic Chemistry", category_id: 2 },
  { id: 16, name: "Biochemistry", category_id: 2 },
  { id: 17, name: "Language and Communication", category_id: 5 },
  { id: 18, name: "Public Speaking Workshop", category_id: 5 },
  { id: 19, name: "English I", category_id: 5 },
  { id: 20, name: "English II", category_id: 5 },
  { id: 21, name: "Economics", category_id: 5 },
  { id: 22, name: "Science and Society I", category_id: 5 },
  { id: 23, name: "Computer Science I", category_id: 3 },
  { id: 24, name: "Programming I", category_id: 3 },
  { id: 25, name: "Digital Logic Fundamentals", category_id: 3 },
  { id: 26, name: "Operations Research II", category_id: 3 },
  { id: 27, name: "Compilers and Interpreters", category_id: 3 },
  { id: 28, name: "Distributed Systems", category_id: 3 },
  { id: 29, name: "Information Systems II", category_id: 3 },
  { id: 30, name: "System Simulation", category_id: 3 },
  { id: 31, name: "Strength of Materials Laboratory", category_id: 10 },
  { id: 32, name: "Mechanics I", category_id: 10 },
  { id: 33, name: "Mechanics II", category_id: 10 },
  { id: 34, name: "Strength of Materials", category_id: 10 },
  { id: 35, name: "Design of Thermal Systems", category_id: 10 },
  { id: 36, name: "Power Plants", category_id: 10 },
  { id: 37, name: "Industrial Ceramic Processes", category_id: 10 },
  { id: 38, name: "Corrosion and Corrosion Control", category_id: 10 },
  { id: 39, name: "Materials Science I", category_id: 10 },
  { id: 40, name: "Materials Science II", category_id: 10 },
  { id: 41, name: "Introduction to Psychology", category_id: 6 },
  { id: 42, name: "General Psychology II", category_id: 6 },
  { id: 43, name: "General Psychology III", category_id: 6 },
  { id: 44, name: "Statistics Applied to Psychology I", category_id: 6 },
  { id: 45, name: "Statistics Applied to Psychology II", category_id: 6 },
  { id: 46, name: "Biological Bases of Behavior I", category_id: 6 },
  { id: 47, name: "Biological Bases of Behavior II", category_id: 6 },
  { id: 48, name: "Psychology and Culture I", category_id: 6 },
  { id: 49, name: "Psychometry", category_id: 6 },
  { id: 50, name: "Developmental Psychology", category_id: 6 },
];

async function main() {
  console.log("Start seeding...");

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });

    console.log(`Role ${role.name} created`);
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });

    console.log(`Category ${category.name} created`);
  }

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { id: subject.id },
      update: subject,
      create: subject,
    });

    console.log(`Subject ${subject.name} created`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
