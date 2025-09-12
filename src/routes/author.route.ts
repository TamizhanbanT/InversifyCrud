import { Router } from "express";
import { container } from "../config/inversify.config";
import { TYPES } from "../types/types";
import { AuthorController } from "../controllers/author.controller";

const router = Router();
const authorController = container.get<AuthorController>(TYPES.AuthorController);

router.post("/", authorController. createAuthor);
router.get("/", authorController.  getAuthor);
router.get("/:id", authorController. getAuthorById);
router.delete("/:id", authorController.deleteAuthor);

export default router;
