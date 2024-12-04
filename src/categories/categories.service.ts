import { Request, Response, NextFunction } from "express";
import { Categories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
import asyncHandler from "express-async-handler";

// CRUD operations
class CategoriesService {
  //Show method
  getAll = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const categories: Categories[] = await categoriesSchema.find();
      res.status(200).json({ data: categories });
    }
  );

  // Create Method
  createOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: Categories = await categoriesSchema.create(req.body);
      res.status(201).json({ data: category });
    }
  );

  // get one method
  getOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: Categories | null = await categoriesSchema.findById(
        req.params.id
      );
      res.status(200).json({ data: category });
    }
  );

  // Update Method
  updateOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: Categories | null =
        await categoriesSchema.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
      res.status(200).json({ data: category });
    }
  );

  // Delete Method
  deleteOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: Categories | null =
        await categoriesSchema.findByIdAndDelete(req.params.id);
      res.status(204).json();
    }
  );
}

const categoriesService = new CategoriesService();

export default categoriesService;
