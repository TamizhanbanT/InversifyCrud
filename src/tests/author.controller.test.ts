import { AuthorController } from "../controllers/author.controller";
import { AuthorService } from "../services/Author.service";
import { Request, Response } from "express";

// Mock AuthorService
const mockAuthorService: jest.Mocked<AuthorService> = {
  createAuthor: jest.fn(),
  getAuthors: jest.fn(),
  getById: jest.fn(),
  updateAuthor: jest.fn(),
  deleteAuthor: jest.fn(),
} as any;

// Mock Response object
const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("AuthorController", () => {
  let controller: AuthorController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AuthorController(mockAuthorService);
  });

  // CREATE
  it("should create an author", async () => {
    const req = { body: { authorName: "Tamizhanban" } } as Request;
    const res = mockResponse();

    mockAuthorService.createAuthor.mockResolvedValue({
      authorId: 1,
      authorName: "Tamizhanban",
    });

    await controller.createAuthor(req, res);

    expect(mockAuthorService.createAuthor).toHaveBeenCalledWith({
      authorName: "Tamizhanban",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  // GET ALL
  it("should return all authors", async () => {
    const req = {} as Request;
    const res = mockResponse();

    mockAuthorService.getAuthors.mockResolvedValue([
      { authorId: 1, authorName: "Test", books: [] },
    ]);

    await controller.getAuthor(req, res);

    expect(mockAuthorService.getAuthors).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  // GET BY ID - Found
  it("should return an author by ID", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    mockAuthorService.getById.mockResolvedValue({
      authorId: 1,
      authorName: "Test",
      books: [],
    });

    await controller.getAuthorById(req, res);

    expect(mockAuthorService.getById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: { authorId: 1, authorName: "Test", books: [] },
      })
    );
  });

  // GET BY ID - Not Found
  it("should return 404 if author not found", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    mockAuthorService.getById.mockResolvedValue(null);

    await controller.getAuthorById(req, res);

    expect(mockAuthorService.getById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Author not found" })
    );
  });

  // UPDATE
  it("should update an author", async () => {
    const req = { params: { id: "1" }, body: { authorName: "Updated" } } as unknown as Request;
    const res = mockResponse();

    mockAuthorService.updateAuthor.mockResolvedValue({
      authorId: 1,
      authorName: "Updated",
    });

    await controller.update(req, res);

    expect(mockAuthorService.updateAuthor).toHaveBeenCalledWith(1, {
      authorName: "Updated",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, message: "Author updated successfully" })
    );
  });

  // DELETE
  it("should delete an author", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    mockAuthorService.deleteAuthor.mockResolvedValue({
      authorId: 1,
      authorName: "Deleted",
    });

    await controller.deleteAuthor(req, res);

    expect(mockAuthorService.deleteAuthor).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, message: "Author deleted successfully" })
    );
  });
});
