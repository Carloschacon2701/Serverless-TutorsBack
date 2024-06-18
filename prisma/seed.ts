import { initializePrisma } from "../src/utils/prisma";

const prisma = initializePrisma();

const careers = [
  {
    id: 1,
    name: "Informatic Engineering",
  },
  {
    id: 2,
    name: "Mechanical Engineering",
  },
  {
    id: 3,
    name: "Electronic Engineering",
  },
  {
    id: 4,
    name: "Civil Engineering",
  },
  {
    id: 5,
    name: "Architecture",
  },
  {
    id: 6,
    name: "Industrial Engineering",
  },
  {
    id: 7,
    name: "Environmental Engineering",
  },
  {
    id: 8,
    name: "Psychology",
  },
  {
    id: 9,
    name: "Civil Engineering",
  },
];

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
    name: "Matemática y Física",
  },
  {
    id: 2,
    name: "Química",
  },
  {
    id: 3,
    name: "Ciencias Sociales",
  },
  {
    id: 4,
    name: "Informática",
  },
  {
    id: 5,
    name: "Mecánica",
  },
  {
    id: 6,
    name: "Psicología",
  },
  {
    id: 7,
    name: "Electrónica",
  },
  {
    id: 8,
    name: "Ambiental",
  },
  {
    id: 9,
    name: "Civil",
  },
  {
    id: 10,
    name: "Arquitectura",
  },
];

const status = [
  {
    id: 1,
    name: "Placed",
  },
  {
    id: 2,
    name: "Cancelled",
  },
];

const subjects = [
  { id: 1, name: "Física I", category_id: 1 },
  { id: 2, name: "Física II", category_id: 1 },
  { id: 3, name: "Estadísticas II", category_id: 1 },
  { id: 4, name: "Matemáticas Discretas", category_id: 1 },
  { id: 5, name: "Estadísticas I", category_id: 1 },
  { id: 6, name: "Estadísticas", category_id: 1 },
  { id: 7, name: "Métodos Numéricos", category_id: 1 },
  { id: 8, name: "Matemáticas", category_id: 1 },
  { id: 9, name: "Matemáticas I", category_id: 1 },
  { id: 10, name: "Matemáticas II", category_id: 1 },
  { id: 11, name: "Matemáticas III", category_id: 1 },
  { id: 12, name: "Matemáticas IV", category_id: 1 },
  { id: 13, name: "Química General I", category_id: 2 },
  { id: 14, name: "Química General II", category_id: 2 },
  { id: 15, name: "Química Orgánica", category_id: 2 },
  { id: 16, name: "Bioquímica", category_id: 2 },
  { id: 17, name: "Lenguaje y Comunicación", category_id: 3 },
  { id: 18, name: "Taller de Oratoria", category_id: 3 },
  { id: 19, name: "Inglés I", category_id: 3 },
  { id: 20, name: "Inglés II", category_id: 3 },
  { id: 21, name: "Economía", category_id: 3 },
  { id: 22, name: "Ciencia y Sociedad I", category_id: 3 },
  { id: 23, name: "Ciencias de la Computación I", category_id: 4 },
  { id: 24, name: "Programación I", category_id: 4 },
  { id: 25, name: "Fundamentos de Lógica Digital", category_id: 4 },
  { id: 26, name: "Investigación de Operaciones II", category_id: 4 },
  { id: 27, name: "Compiladores e Intérpretes", category_id: 4 },
  { id: 28, name: "Sistemas Distribuidos", category_id: 4 },
  { id: 29, name: "Sistemas de Información II", category_id: 4 },
  { id: 30, name: "Simulación de Sistemas", category_id: 4 },
  { id: 31, name: "Laboratorio de Resistencia de Materiales", category_id: 5 },
  { id: 32, name: "Mecánica I", category_id: 5 },
  { id: 33, name: "Mecánica II", category_id: 5 },
  { id: 34, name: "Resistencia de Materiales", category_id: 5 },
  { id: 35, name: "Diseño de Sistemas Térmicos", category_id: 5 },
  { id: 36, name: "Plantas de Energía", category_id: 5 },
  { id: 37, name: "Procesos Cerámicos Industriales", category_id: 5 },
  { id: 38, name: "Corrosión y Control de Corrosión", category_id: 5 },
  { id: 39, name: "Ciencia de Materiales I", category_id: 5 },
  { id: 40, name: "Ciencia de Materiales II", category_id: 5 },
  { id: 41, name: "Introducción a la Psicología", category_id: 6 },
  { id: 42, name: "Psicología General II", category_id: 6 },
  { id: 43, name: "Psicología General III", category_id: 6 },
  { id: 44, name: "Estadísticas Aplicadas a la Psicología I", category_id: 6 },
  { id: 45, name: "Estadísticas Aplicadas a la Psicología II", category_id: 6 },
  { id: 46, name: "Bases Biológicas del Comportamiento I", category_id: 6 },
  { id: 47, name: "Bases Biológicas del Comportamiento II", category_id: 6 },
  { id: 48, name: "Psicología y Cultura I", category_id: 6 },
  { id: 49, name: "Psicometría", category_id: 6 },
  { id: 50, name: "Psicología del Desarrollo", category_id: 6 },
  { id: 51, name: "Psicología Educativa", category_id: 6 },
  { id: 52, name: "Metodología de la Investigación", category_id: 6 },
  { id: 53, name: "Bioinstrumentación II", category_id: 7 },
  { id: 54, name: "Bioinstrumentación III", category_id: 7 },
  { id: 55, name: "Circuitos Eléctricos", category_id: 7 },
  { id: 56, name: "Electrónica I", category_id: 7 },
  { id: 57, name: "Electrónica II", category_id: 7 },
  { id: 58, name: "Imágenes", category_id: 7 },
  { id: 59, name: "Mediciones", category_id: 7 },
  { id: 60, name: "Tecnología Eléctrica", category_id: 7 },
  { id: 61, name: "Laboratorio de Ingeniería Eléctrica", category_id: 7 },
  { id: 62, name: "Laboratorio de Tecnología Eléctrica", category_id: 7 },
  { id: 63, name: "Laboratorio de Ingeniería Eléctrica", category_id: 7 },
  { id: 64, name: "Instalaciones Eléctricas", category_id: 7 },
  { id: 65, name: "Ingeniería Eléctrica", category_id: 7 },
  { id: 66, name: "Ingeniería Eléctrica", category_id: 7 },
  { id: 67, name: "Circuitos I", category_id: 7 },
  { id: 68, name: "Circuitos II", category_id: 7 },
  { id: 69, name: "Introducción a la Ingeniería Electrónica", category_id: 7 },
  { id: 70, name: "Laboratorio de Sistemas Digitales I", category_id: 7 },
  { id: 71, name: "Laboratorio de Sistemas Digitales II", category_id: 7 },
  { id: 72, name: "Sistemas Digitales II", category_id: 7 },
  { id: 73, name: "Electrónica I", category_id: 7 },
  { id: 74, name: "Sistemas Digitales I", category_id: 7 },
  { id: 75, name: "Electrónica II", category_id: 7 },
  { id: 76, name: "Electrónica III", category_id: 7 },
  { id: 77, name: "Electrónica IV", category_id: 7 },
  { id: 78, name: "Instrumentación Industrial", category_id: 7 },
  { id: 79, name: "Proyectos de Sistemas de Control", category_id: 7 },
  { id: 80, name: "Proyectos de Instrumentación Electrónica", category_id: 7 },
  { id: 81, name: "Automatización Industrial", category_id: 7 },
  { id: 82, name: "Señales y Sistemas I", category_id: 7 },
  { id: 83, name: "Sistemas de Control I", category_id: 7 },
  { id: 84, name: "Sistemas de Control II", category_id: 7 },
  { id: 85, name: "Instrumentación y Control", category_id: 7 },
  { id: 86, name: "Automatización", category_id: 7 },
  { id: 87, name: "Laboratorio de Telecomunicaciones", category_id: 7 },
  { id: 88, name: "Comunicaciones de Radiofrecuencia", category_id: 7 },
  { id: 89, name: "Redes de Computadoras", category_id: 7 },
  { id: 90, name: "Propagación y Antenas", category_id: 7 },
  { id: 91, name: "Aprendizaje Automático", category_id: 7 },
  { id: 92, name: "Inteligencia Artificial", category_id: 7 },
  { id: 93, name: "Proyectos de Radiofrecuencia", category_id: 7 },
  {
    id: 94,
    name: "Tecnología de la Información y Comunicación",
    category_id: 7,
  },
  { id: 95, name: "Teoría Electromagnética", category_id: 7 },
  { id: 96, name: "Señales y Sistemas II", category_id: 7 },
  { id: 97, name: "Telecomunicaciones I", category_id: 7 },
  { id: 98, name: "Electrónica del Estado Sólido", category_id: 7 },
  { id: 99, name: "Tratamiento Fisicoquímico del Agua", category_id: 8 },
  {
    id: 100,
    name: "Procesos y Operaciones Básicas en Ingeniería Ambiental",
    category_id: 8,
  },
  { id: 101, name: "Geología y Suelos", category_id: 8 },
  { id: 102, name: "Ecotoxicología", category_id: 8 },
  { id: 103, name: "Ecología y Contaminación Ambiental", category_id: 8 },
  { id: 104, name: "Zoonosis y Medio Ambiente", category_id: 8 },
  { id: 105, name: "Estudios de Impacto Ambiental", category_id: 8 },
  { id: 106, name: "Materiales y Pruebas", category_id: 9 },
  { id: 107, name: "Cimentaciones y Muros", category_id: 9 },
  { id: 108, name: "Ingeniería Sísmica", category_id: 9 },
  { id: 109, name: "Análisis Estructural I", category_id: 9 },
  { id: 110, name: "Análisis Estructural II", category_id: 9 },
  { id: 111, name: "Mecánica de Materiales", category_id: 9 },
  { id: 112, name: "Dibujo Asistido por Computadora", category_id: 9 },
  { id: 113, name: "Topografía para Ingeniería Civil", category_id: 9 },
  { id: 114, name: "Geología Aplicada", category_id: 9 },
  { id: 115, name: "Ingeniería de Tráfico", category_id: 9 },
  { id: 116, name: "Hidrología Aplicada", category_id: 9 },
  { id: 117, name: "Saneamiento Ambiental", category_id: 9 },
  { id: 118, name: "Mecánica de Fluidos II", category_id: 9 },
  { id: 119, name: "Instalaciones para Edificios", category_id: 9 },
  { id: 120, name: "Pavimentos", category_id: 9 },
  { id: 121, name: "Introducción a la Ingeniería Civil", category_id: 9 },
  {
    id: 122,
    name: "Gestión y Control de Obras de Construcción I",
    category_id: 9,
  },
  {
    id: 123,
    name: "Gestión y Control de Obras de Construcción II",
    category_id: 9,
  },
  { id: 124, name: "Patología de Obras Civiles", category_id: 9 },
  { id: 125, name: "Seminario de Investigación", category_id: 9 },
  { id: 126, name: "Proyectos Estructurales I", category_id: 9 },
  { id: 127, name: "Puentes", category_id: 9 },
  { id: 128, name: "Proyectos de Carreteras I", category_id: 9 },
  { id: 129, name: "Proyectos de Carreteras II", category_id: 9 },
  { id: 130, name: "Diseño y Arquitectura I", category_id: 10 },
  { id: 131, name: "Arquitectura y Estructuras", category_id: 10 },
  { id: 132, name: "Inspección de Obras", category_id: 10 },
  { id: 133, name: "Patrimonio Construido", category_id: 10 },
  { id: 134, name: "Historia de la Arquitectura II", category_id: 10 },
  { id: 135, name: "Fotografía", category_id: 10 },
  {
    id: 136,
    name: "Análisis del Territorio Urbano con Sistemas de Información Geográfica",
    category_id: 10,
  },
  { id: 137, name: "Geometría Descriptiva", category_id: 10 },
  { id: 138, name: "Proyectos III", category_id: 10 },
  { id: 139, name: "Proyectos IV", category_id: 10 },
  { id: 140, name: "Proyectos V", category_id: 10 },
  { id: 141, name: "Proyectos VIII", category_id: 10 },
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

  for (const career of careers) {
    await prisma.career.upsert({
      where: { id: career.id },
      update: career,
      create: career,
    });

    console.log(`Career ${career.name} created`);
  }

  for (const stat of status) {
    await prisma.status.upsert({
      where: { id: stat.id },
      update: stat,
      create: stat,
    });

    console.log(`Status ${stat.name} created`);
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
