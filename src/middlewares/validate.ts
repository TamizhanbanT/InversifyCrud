import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.errors, 
      });
    }
  };
};
