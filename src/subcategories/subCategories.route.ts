import { Router } from "express";
import subCategoriesService from "./subCategories.service";

const subCategoriesRoute: Router = Router({ mergeParams: true });

subCategoriesRoute
  .route("/")
  .get(subCategoriesService.filterSubCategories,subCategoriesService.getAll)
  .post(subCategoriesService.setCategoryId,subCategoriesService.createOne);

subCategoriesRoute
  .route("/:id")
  .get(subCategoriesService.getOne)
  .put(subCategoriesService.updateOne)
  .delete(subCategoriesService.deleteOne);

export default subCategoriesRoute;
