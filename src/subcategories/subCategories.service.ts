// imports
import { Request, Response, NextFunction } from "express";
import refactorService from "../refactor.service";
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
  getAll = refactorService.getAll<SubCategories>(subCategoriesSchema);

  // Create Method
  createOne = refactorService.createOne<SubCategories>(subCategoriesSchema);

  // get one method
  getOne = refactorService.getOne<SubCategories>(subCategoriesSchema);

  // Update Method
  updateOne = refactorService.updateOne<SubCategories>(subCategoriesSchema);

  // Delete Method
  deleteOne = refactorService.deleteOne<SubCategories>(subCategoriesSchema);
}

const subCategoriesService = new SubCategoriesService();

// exports
export default subCategoriesService;
