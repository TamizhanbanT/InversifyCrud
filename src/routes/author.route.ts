import { Router } from "express";
import { container } from "../config/inversify.config";
import { TYPES } from "../types/types";
import { AuthorController } from "../controllers/author.controller";
import { AuthorSchema } from "../validators/author.validate";
import { validate } from "../middlewares/validate";

const router = Router();
const authorController = container.get<AuthorController>(TYPES.AuthorController);


router.post("/", validate(AuthorSchema), (req, res) =>
  authorController.createAuthor(req, res)
);

router.get("/", (req, res) => authorController.getAuthor(req, res));


router.get("/:id", (req, res) => authorController.getAuthorById(req, res));


router.put("/:id", validate(AuthorSchema.partial()), (req, res) =>
  authorController.update(req, res)
);


router.delete("/:id", (req, res) => authorController.deleteAuthor(req, res));

export default router;
