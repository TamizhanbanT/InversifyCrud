import { Router } from "express";
import { container } from "../config/inversify.config";
import { TYPES } from "../types/types";
import { BookController } from "../controllers/book.controller";
import { validate } from "../middlewares/validate";
import { BookSchema } from "../validators/book.validate";
const router = Router();

const bookController = container.get<BookController>(TYPES.BookController);

// router.post("/", bookController. createBook);
// router.get("/", bookController. getBooks);
// router.get("/:id", bookController. getBookById);
// router.delete("/:id", bookController.deleteBook);

// router.put("/:id",bookController.updateBook)

// CREATE
router.post("/", validate(BookSchema), (req, res) =>
  bookController.createBook(req, res)
);

// GET ALL
router.get("/", (req, res) =>
  bookController.getBooks(req, res)
);

// GET BY ID
router.get("/:id", (req, res) =>
  bookController.getBookById(req, res)
);

// UPDATE
router.put("/:id", validate(BookSchema.partial()), (req, res) =>
  bookController.updateBook(req, res)
);

// DELETE
router.delete("/:id", (req, res) =>
  bookController.deleteBook(req, res)
);


export default router;
