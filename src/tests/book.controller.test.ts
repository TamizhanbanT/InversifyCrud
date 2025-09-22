import { BookController } from "../controllers/book.controller";
import { BookService } from "../services/book.service";
import { Request, Response } from "express";

// Mock BookService
const mockBookService: jest.Mocked<BookService> = {
  createBook: jest.fn(),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  updateById: jest.fn(),
  deleteBook: jest.fn(),
} as any;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("BookController", () => {
  let controller: BookController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new BookController(mockBookService);
  });

  const mockBook = {
    bookId: 1,
    bookName: "Book 1",
    price: 100,
    authorId: 1,
    author: { authorId: 1, authorName: "Tamizhanban" },
  };

  // CREATE
  it("should create a book", async () => {
    const req = { body: { bookName: "Book 1", price: 100, authorId: 1 } } as Request;
    const res = mockResponse();

    mockBookService.createBook.mockResolvedValue(mockBook);

    await controller.createBook(req, res);

    expect(mockBookService.createBook).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: mockBook })
    );
  });

  // GET ALL
  it("should get all books", async () => {
    const req = {} as Request;
    const res = mockResponse();

    mockBookService.getBooks.mockResolvedValue([mockBook]);

    await controller.getBooks(req, res);

    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: [mockBook] })
    );
  });

  // GET BY ID (not found)
  it("should return 404 if book not found", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    mockBookService.getBookById.mockResolvedValue(null);

    await controller.getBookById(req, res);

    expect(mockBookService.getBookById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  // UPDATE
  it("should update a book", async () => {
    const req = { params: { id: "1" }, body: { bookName: "Updated Book" } } as unknown as Request;
    const res = mockResponse();

    const updatedBook = { ...mockBook, bookName: "Updated Book" };
    mockBookService.updateById.mockResolvedValue(updatedBook);

    await controller.updateBook(req, res);

    expect(mockBookService.updateById).toHaveBeenCalledWith(1, { bookName: "Updated Book" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  // DELETE
  it("should delete a book", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    mockBookService.deleteBook.mockResolvedValue(mockBook);

    await controller.deleteBook(req, res);

    expect(mockBookService.deleteBook).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: mockBook })
    );
  });
});
