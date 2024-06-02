import { initializePrisma } from "../src/utils/prisma";

const prisma = initializePrisma();

const days = [
  {
    id: 1,
    name: "Monday",
  },
  {
    id: 2,
    name: "Tuesday",
  },
  {
    id: 3,
    name: "Wednesday",
  },
  {
    id: 4,
    name: "Thursday",
  },
  {
    id: 5,
    name: "Friday",
  },
  {
    id: 6,
    name: "Saturday",
  },
  {
    id: 7,
    name: "Sunday",
  },
];

const currencies = [
  {
    id: 1,
    name: "USD",
    symbol: "$",
  },
  {
    id: 2,
    name: "COP",
    symbol: "$",
  },
  {
    id: 3,
    name: "VES",
    symbol: "Bs",
  },
];

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
    name: "Social Studies",
  },
  {
    id: 4,
    name: "Informatics",
  },

  {
    id: 5,
    name: "Mechanical",
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
  { id: 17, name: "Language and Communication", category_id: 3 },
  { id: 18, name: "Public Speaking Workshop", category_id: 3 },
  { id: 19, name: "English I", category_id: 3 },
  { id: 20, name: "English II", category_id: 3 },
  { id: 21, name: "Economics", category_id: 3 },
  { id: 22, name: "Science and Society I", category_id: 3 },
  { id: 23, name: "Computer Science I", category_id: 4 },
  { id: 24, name: "Programming I", category_id: 4 },
  { id: 25, name: "Digital Logic Fundamentals", category_id: 4 },
  { id: 26, name: "Operations Research II", category_id: 4 },
  { id: 27, name: "Compilers and Interpreters", category_id: 4 },
  { id: 28, name: "Distributed Systems", category_id: 4 },
  { id: 29, name: "Information Systems II", category_id: 4 },
  { id: 30, name: "System Simulation", category_id: 4 },
  { id: 31, name: "Strength of Materials Laboratory", category_id: 5 },
  { id: 32, name: "Mechanics I", category_id: 5 },
  { id: 33, name: "Mechanics II", category_id: 5 },
  { id: 34, name: "Strength of Materials", category_id: 5 },
  { id: 35, name: "Design of Thermal Systems", category_id: 5 },
  { id: 36, name: "Power Plants", category_id: 5 },
  { id: 37, name: "Industrial Ceramic Processes", category_id: 5 },
  { id: 38, name: "Corrosion and Corrosion Control", category_id: 5 },
  { id: 39, name: "Materials Science I", category_id: 5 },
  { id: 40, name: "Materials Science II", category_id: 5 },
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
  { id: 51, name: "Educational Psychology", category_id: 6 },
  { id: 52, name: "Research Methodology", category_id: 6 },
  { id: 53, name: "Bioinstrumentation II", category_id: 7 },
  { id: 54, name: "Bioinstrumentation III", category_id: 7 },
  { id: 55, name: "Electrical Circuits", category_id: 7 },
  { id: 56, name: "Electronics I", category_id: 7 },
  { id: 57, name: "Electronics II", category_id: 7 },
  { id: 58, name: "Imaging", category_id: 7 },
  { id: 59, name: "Measurements", category_id: 7 },
  { id: 60, name: "Electrical Technology", category_id: 7 },
  { id: 61, name: "Electrical Engineering Laboratory", category_id: 7 },
  { id: 62, name: "Electrical Technology Laboratory", category_id: 7 },
  { id: 63, name: "Electrical Engineering Laboratory", category_id: 7 },
  { id: 64, name: "Electrical Installations", category_id: 7 },
  { id: 65, name: "Electrical Engineering", category_id: 7 },
  { id: 66, name: "Electrical Engineering", category_id: 7 },
  { id: 67, name: "Circuits I", category_id: 7 },
  { id: 68, name: "Circuits II", category_id: 7 },
  { id: 69, name: "Introduction to Electronic Engineering", category_id: 7 },
  { id: 70, name: "Laboratory of Digital Systems I", category_id: 7 },
  { id: 71, name: "Laboratory of Digital Systems II", category_id: 7 },
  { id: 72, name: "Digital Systems II", category_id: 7 },
  { id: 73, name: "Electronics I", category_id: 7 },
  { id: 74, name: "Digital Systems I", category_id: 7 },
  { id: 75, name: "Electronics II", category_id: 7 },
  { id: 76, name: "Electronics III", category_id: 7 },
  { id: 77, name: "Electronics IV", category_id: 7 },
  { id: 78, name: "Industrial Instrumentation", category_id: 7 },
  { id: 79, name: "Control Systems Projects", category_id: 7 },
  { id: 80, name: "Electronic Instrumentation Projects", category_id: 7 },
  { id: 81, name: "Industrial Automation", category_id: 7 },
  { id: 82, name: "Signals And Systems I", category_id: 7 },
  { id: 83, name: "Control Systems I", category_id: 7 },
  { id: 84, name: "Control Systems II", category_id: 7 },
  { id: 85, name: "Instrumentation And Control", category_id: 7 },
  { id: 86, name: "Automation", category_id: 7 },
  { id: 87, name: "Telecommunications Laboratory", category_id: 7 },
  { id: 88, name: "Radiofrequency Communications", category_id: 7 },
  { id: 89, name: "Computer Networks", category_id: 7 },
  { id: 90, name: "Propagation and Antennas", category_id: 7 },
  { id: 91, name: "Machine Learning", category_id: 7 },
  { id: 92, name: "Artificial Intelligence", category_id: 7 },
  { id: 93, name: "Radio Frequency Projects", category_id: 7 },
  { id: 94, name: "Information and Communications Technology", category_id: 7 },
  { id: 95, name: "Electromagnetic Theory", category_id: 7 },
  { id: 96, name: "Signals and Systems II", category_id: 7 },
  { id: 97, name: "Telecommunications I", category_id: 7 },
  { id: 98, name: "Solid State Electronics", category_id: 7 },
  { id: 99, name: "Physicochemical Treatment of Water", category_id: 8 },
  {
    id: 100,
    name: "Basic Processes and Operations in Environmental Engineering",
    category_id: 8,
  },
  { id: 101, name: "Geology and Soils", category_id: 8 },
  { id: 102, name: "Ecotoxicology", category_id: 8 },
  { id: 103, name: "Ecology and Environmental Contamination", category_id: 8 },
  { id: 104, name: "Zoonosis and Environment", category_id: 8 },
  { id: 105, name: "Environmental Impact Studies", category_id: 8 },
  { id: 106, name: "Materials and Testing", category_id: 9 },
  { id: 107, name: "Foundations and Walls", category_id: 9 },
  { id: 108, name: "Earthquake Engineering", category_id: 9 },
  { id: 109, name: "Structural Analysis I", category_id: 9 },
  { id: 110, name: "Structural Analysis II", category_id: 9 },
  { id: 111, name: "Mechanics of Materials", category_id: 9 },
  { id: 112, name: "Computer Aided Drafting", category_id: 9 },
  { id: 113, name: "Surveying for Civil Engineering", category_id: 9 },
  { id: 114, name: "Applied Geology", category_id: 9 },
  { id: 115, name: "Traffic Engineering", category_id: 9 },
  { id: 116, name: "Applied Hydrology", category_id: 9 },
  { id: 117, name: "Environmental Sanitation", category_id: 9 },
  { id: 118, name: "Fluid Mechanics II", category_id: 9 },
  { id: 119, name: "Installations for Buildings", category_id: 9 },
  { id: 120, name: "Pavements", category_id: 9 },
  { id: 121, name: "Introduction to Civil Engineering", category_id: 9 },
  {
    id: 122,
    name: "Management and Control of Construction Works I",
    category_id: 9,
  },
  {
    id: 123,
    name: "Management and Control of Construction Works II",
    category_id: 9,
  },
  { id: 124, name: "Pathology of Civil Works", category_id: 9 },
  { id: 125, name: "Research Seminar", category_id: 9 },
  { id: 126, name: "Structural Projects I", category_id: 9 },
  { id: 127, name: "Bridges", category_id: 9 },
  { id: 128, name: "Roadway Projects I", category_id: 9 },
  { id: 129, name: "Road Projects II", category_id: 9 },
  { id: 130, name: "Design and Architecture I", category_id: 10 },
  { id: 131, name: "Architecture and Structures", category_id: 10 },
  { id: 132, name: "Inspection of Works", category_id: 10 },
  { id: 133, name: "Built Heritage", category_id: 10 },
  { id: 134, name: "History of Architecture II", category_id: 10 },
  { id: 135, name: "Photography", category_id: 10 },
  {
    id: 136,
    name: "Analysis of the Urban Territory with Geographic Information Systems",
    category_id: 10,
  },
  { id: 137, name: "Descriptive Geometry", category_id: 10 },
  { id: 138, name: "Projects III", category_id: 10 },
  { id: 139, name: "Projects IV", category_id: 10 },
  { id: 140, name: "Projects V", category_id: 10 },
  { id: 141, name: "Projects VIII", category_id: 10 },
];

async function main() {
  console.log("Start seeding...");

  for (const day of days) {
    await prisma.day.upsert({
      where: { id: day.id },
      update: day,
      create: day,
    });

    console.log(`Day ${day.name} created`);
  }

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: role,
      create: role,
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

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { id: currency.id },
      update: currency,
      create: currency,
    });

    console.log(`Currency ${currency.name} created`);
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
