import { BookService } from "../services/book.service";
import { BookRepository } from "../repositories/Book.repository";
import { BookDto } from "../dto/book.dto";

// Mock BookRepository
const mockBookRepo: jest.Mocked<BookRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe("BookService", () => {
  let bookService: BookService;

  beforeEach(() => {
    jest.clearAllMocks();
    bookService = new BookService(mockBookRepo);
  });

  const sampleBook: BookDto = {
    bookName: "Book 1",
    price: 100,
    authorId: 1,
  };

  const mockBookWithAuthor = {
    bookId: 1,
    bookName: "Book 1",
    price: 100,
    authorId: 1,
    author: {
      authorId: 1,
      authorName: "Tamizhanban",
    },
  };

  it("should create a book", async () => {
    mockBookRepo.create.mockResolvedValue(mockBookWithAuthor);

    const result = await bookService.createBook(sampleBook);

    expect(mockBookRepo.create).toHaveBeenCalledWith(sampleBook);
    expect(result).toEqual(mockBookWithAuthor);
  });

  it("should return all books", async () => {
    mockBookRepo.findAll.mockResolvedValue([mockBookWithAuthor]);

    const result = await bookService.getBooks();

    expect(mockBookRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockBookWithAuthor]);
  });

  it("should return book by id", async () => {
    mockBookRepo.findById.mockResolvedValue(mockBookWithAuthor);

    const result = await bookService.getBookById(1);

    expect(mockBookRepo.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockBookWithAuthor);
  });

  it("should update a book", async () => {
    const updatedBook = { ...mockBookWithAuthor, bookName: "Updated Book" };
    mockBookRepo.update.mockResolvedValue(updatedBook);

    const result = await bookService.updateById(1, { bookName: "Updated Book" });

    expect(mockBookRepo.update).toHaveBeenCalledWith(1, { bookName: "Updated Book" });
    expect(result).toEqual(updatedBook);
  });

  it("should delete a book", async () => {
    mockBookRepo.delete.mockResolvedValue(mockBookWithAuthor);

    const result = await bookService.deleteBook(1);

    expect(mockBookRepo.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockBookWithAuthor);
  });
});
