import { Router } from "express";
import { container } from "../config/inversify.config";
import { TYPES } from "../types/types";
import { BookController } from "../controllers/book.controller";

const router = Router();
const bookController = container.get<BookController>(TYPES.BookController);

router.post("/", bookController. createBook);
router.get("/", bookController. getBooks);
router.get("/:id", bookController. getBookById);
router.delete("/:id", bookController.deleteBook);

export default router;
