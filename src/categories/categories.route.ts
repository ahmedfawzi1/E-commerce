import { Router } from "express";
import categoriesService from "./categories.service";
import subCategoriesRoute from "../subcategories/subCategories.route";
import categoriesValidation from "./categories.validation";

const categoriesRouter: Router = Router();

categoriesRouter.use("/:categoryId/subCategories", subCategoriesRoute);

categoriesRouter
  .route("/")
  .get(categoriesService.getAll)
  .post(categoriesValidation.createOne, categoriesService.createOne);

categoriesRouter
  .route("/:id")
  .get(categoriesValidation.getOne, categoriesService.getOne)
  .put(categoriesValidation.updateOne, categoriesService.updateOne)
  .delete(categoriesValidation.deleteOne, categoriesService.deleteOne);

export default categoriesRouter;
