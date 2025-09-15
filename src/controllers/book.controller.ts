import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { BookService } from '../services/book.service';

@injectable()
export class BookController {
  constructor(
    @inject(TYPES.BookService) private bookService: BookService
  ) {}

  // Create Book
  createBook = async (req: Request, res: Response) => {
    try {
      const book = await this.bookService.createBook(req.body);
      return res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to create book",
        error: error.message,
      });
    }
  };

  // Get All Books
  getBooks = async (req: Request, res: Response) => {
    try {
      const books = await this.bookService.getBooks();
      return res.status(200).json({
        success: true,
        data: books,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch books",
        error: error.message,
      });
    }
  };

  // Get Book by ID
  getBookById = async (req: Request, res: Response) => {
    try {
      const book = await this.bookService.getBookById(+req.params.id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch book",
        error: error.message,
      });
    }
  };

  //update
  updateBook=async(req:Request,res:Response)=>{

    try{
      const updated=await this.bookService.updateById(+req.params.id,req.body)
      if(!updated){
        return res.status(404).json({
        success:false,
        message:"Book Not found"
        })
      }
      return res.status(200).json({
        success:true,
        message:"Book update successfully"
      })

    }catch(error:any){

      return res.status(500).json({
        success:false,
        message:"Failed to update"
      })
    }

  }

  // Delete Book
  deleteBook = async (req: Request, res: Response) => {
    try {
      const deleted = await this.bookService.deleteBook(+req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: deleted,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete book",
        error: error.message,
      });
    }
  };
}
