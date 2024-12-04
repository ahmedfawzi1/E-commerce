// imports
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import subCategoriesSchema from "./subCategories.schema";
import { SubCategories } from "./subCategories.interface";

// CRUD operations
class SubCategoriesService {
  setCategoryId(req: Request, res: Response, next: NextFunction) {
    if (req.params.categoryId && !req.body.category)
      req.body.category = req.params.categoryId;
    next();
  }
  // filter data
  filterSubCategories(req: Request, res: Response, next: NextFunction) {
    const filterData: any = {};
    if (req.params.categoryId) filterData.category = req.params.categoryId;
    req.filterData = filterData;
    next();
  }

  //Show method
  getAll = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let filterData: any = {};
      if (req.filterData) filterData = req.filterData ;
      const subCategories: SubCategories[] = await subCategoriesSchema.find(filterData);
      res.status(200).json({ data: subCategories });
    }
  );

  // Create Method
  createOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subCategory: SubCategories = await subCategoriesSchema.create(
        req.body
      );
      res.status(201).json({ data: subCategory });
    }
  );

  // get one method
  getOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subCategory: SubCategories | null =
        await subCategoriesSchema.findById(req.params.id);
      res.status(200).json({ data: subCategory });
    }
  );

  // Update Method
  updateOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subCategory: SubCategories | null =
        await subCategoriesSchema.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
      res.status(200).json({ data: subCategory });
    }
  );

  // Delete Method
  deleteOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subCategory: SubCategories | null =
        await subCategoriesSchema.findByIdAndDelete(req.params.id);
      res.status(204).json();
    }
  );
}

const subCategoriesService = new SubCategoriesService();

// exports
export default subCategoriesService;
