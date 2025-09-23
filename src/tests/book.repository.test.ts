import { BookRepository } from "../repositories/Book.repository";
import prisma from "../config/prisma";
import { BookDto } from "../dto/book.dto";

// Mock Prisma client
jest.mock("../config/prisma", () => ({
  book: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("BookRepository", () => {
  let bookRepo: BookRepository;

  beforeEach(() => {
    bookRepo = new BookRepository();
    jest.clearAllMocks();
  });

  const sampleBook: BookDto = {
    bookName: "Sample Book",
    price: 250,
    authorId: 1,
  };

  const sampleBookWithId = {
    bookId: 1,
    ...sampleBook,
    author: { authorId: 1, authorName: "Author Name" },
  };

  // CREATE
  it("should create a book", async () => {
    (prisma.book.create as jest.Mock).mockResolvedValue(sampleBookWithId);

    const result = await bookRepo.create(sampleBook);

    expect(prisma.book.create).toHaveBeenCalledWith({ data: sampleBook });
    expect(result).toEqual(sampleBookWithId);
  });

  // FIND ALL
  it("should return all books", async () => {
    (prisma.book.findMany as jest.Mock).mockResolvedValue([sampleBookWithId]);

    const result = await bookRepo.findAll();

    expect(prisma.book.findMany).toHaveBeenCalledWith({
      include: { author: true },
    });
    expect(result).toEqual([sampleBookWithId]);
  });

  // FIND BY ID
  it("should return a book by id", async () => {
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(sampleBookWithId);

    const result = await bookRepo.findById(1);

    expect(prisma.book.findUnique).toHaveBeenCalledWith({
      where: { bookId: 1 },
      include: { author: true },
    });
    expect(result).toEqual(sampleBookWithId);
  });

  // UPDATE
  it("should update a book", async () => {
    const updatedBook = { ...sampleBookWithId, bookName: "Updated Book" };
    (prisma.book.update as jest.Mock).mockResolvedValue(updatedBook);

    const result = await bookRepo.update(1, { bookName: "Updated Book" });

    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { bookId: 1 },
      data: { bookName: "Updated Book" },
    });
    expect(result).toEqual(updatedBook);
  });

  // DELETE
  it("should delete a book", async () => {
    (prisma.book.delete as jest.Mock).mockResolvedValue(sampleBookWithId);

    const result = await bookRepo.delete(1);

    expect(prisma.book.delete).toHaveBeenCalledWith({
      where: { bookId: 1 },
    });
    expect(result).toEqual(sampleBookWithId);
  });
});
