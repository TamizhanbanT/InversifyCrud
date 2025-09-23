import { AuthorService } from "../services/Author.service";
import { AuthorRepository } from "../repositories/Author.repository";
import { AuthorDto } from "../dto/author.dto";

// Mock AuthorRepository
const mockAuthorRepo: jest.Mocked<AuthorRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe("AuthorService", () => {
  let service: AuthorService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthorService(mockAuthorRepo);
  });

  it("should create an author", async () => {
    const input: AuthorDto = { authorName: "Jane Austen" };
    const output = { authorId: 1, authorName: "Jane Austen", books: [] };

    mockAuthorRepo.create.mockResolvedValue(output);

    const result = await service.createAuthor(input);
    expect(mockAuthorRepo.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(output);
  });

  it("should get all authors", async () => {
    const output = [{ authorId: 1, authorName: "Test", books: [] }];
    mockAuthorRepo.findAll.mockResolvedValue(output);

    const result = await service.getAuthors();
    expect(mockAuthorRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual(output);
  });

  it("should get author by ID", async () => {
    const output = { authorId: 1, authorName: "Test", books: [] };
    mockAuthorRepo.findById.mockResolvedValue(output);

    const result = await service.getById(1);
    expect(mockAuthorRepo.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(output);
  });

  it("should update an author", async () => {
    const input: Partial<AuthorDto> = { authorName: "Updated" };
    const output = { authorId: 1, authorName: "Updated", books: [] };
    mockAuthorRepo.update.mockResolvedValue(output);

    const result = await service.updateAuthor(1, input);
    expect(mockAuthorRepo.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(output);
  });

  it("should delete an author", async () => {
    const output = { authorId: 1, authorName: "Deleted", books: [] };
    mockAuthorRepo.delete.mockResolvedValue(output);

    const result = await service.deleteAuthor(1);
    expect(mockAuthorRepo.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(output);
  });
});
