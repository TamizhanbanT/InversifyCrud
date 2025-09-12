import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { AuthorService } from "../services/Author.service";

@injectable()
export class AuthorController {
  constructor(
    @inject(TYPES.AuthorService) private authorService: AuthorService
  ) {}

  // Create Author
  createAuthor = async (req: Request, res: Response) => {
    try {
      const author = await this.authorService.createAuthor(req.body);
      return res.status(201).json({
        success: true,
        message: "Author created successfully",
        data: author,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to create author",
        error: error.message,
      });
    }
  };

  // Get All Authors
  getAuthor = async (req: Request, res: Response) => {
    try {
      const authors = await this.authorService.getAuthors();
      return res.status(200).json({
        success: true,
        data: authors,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch authors",
        error: error.message,
      });
    }
  };

  // Get Author by ID
  getAuthorById = async (req: Request, res: Response) => {
    try {
      const author = await this.authorService.getById(+req.params.id);
      if (!author) {
        return res.status(404).json({
          success: false,
          message: "Author not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: author,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch author",
        error: error.message,
      });
    }
  };

  // Delete Author
  deleteAuthor = async (req: Request, res: Response) => {
    try {
      const deleted = await this.authorService.deleteAuthor(+req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Author not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Author deleted successfully",
        data: deleted,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete author",
        error: error.message,
      });
    }
  };
}
