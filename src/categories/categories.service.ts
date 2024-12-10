import { Request, Response, NextFunction } from "express";
import { Categories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
import asyncHandler from "express-async-handler";
import refactorService from "../refactor.service";

// CRUD operations
class CategoriesService {
  //Show method
  getAll = refactorService.getAll<Categories>(categoriesSchema);

  // Create Method
  createOne = refactorService.createOne<Categories>(categoriesSchema);

  // get one method
  getOne = refactorService.getOne<Categories>(categoriesSchema);

  // Update Method
  updateOne = refactorService.updateOne<Categories>(categoriesSchema);

  // Delete Method
  deleteOne = refactorService.deleteOne <Categories>(categoriesSchema);
}

const categoriesService = new CategoriesService();

export default categoriesService;
