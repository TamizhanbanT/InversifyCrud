import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Authors
  const author1 = await prisma.author.create({
    data: {
      authorName: "Jane Austen",
      books: {
        create: [
          { bookName: "Pride and Prejudice", price: 299.99 },
          { bookName: "Sense and Sensibility", price: 249.99 },
        ],
      },
    },
  });

  const author2 = await prisma.author.create({
    data: {
      authorName: "William Shakespeare",
      books: {
        create: [
          { bookName: "Hamlet", price: 199.99 },
          { bookName: "Macbeth", price: 179.99 },
        ],
      },
    },
  });

  const author3 = await prisma.author.create({
    data: {
      authorName: "R. K. Narayan",
      books: {
        create: [
          { bookName: "Malgudi Days", price: 149.99 },
        ],
      },
    },
  });

  console.log({ author1, author2, author3 });
}

main()
  .then(() => {
    console.log(" Database seeded successfully!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
