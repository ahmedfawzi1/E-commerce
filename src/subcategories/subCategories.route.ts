import { Router } from "express";
import subCategoriesService from "./subCategories.service";
import subCategoriesValidation from "./subCategories.validation";

const subCategoriesRoute: Router = Router({ mergeParams: true });

subCategoriesRoute
  .route("/")
  .get(subCategoriesService.filterSubCategories, subCategoriesService.getAll)
  .post(
    subCategoriesService.setCategoryId,
    subCategoriesValidation.createOne,
    subCategoriesService.createOne
  );

subCategoriesRoute
  .route("/:id")
  .get(subCategoriesValidation.getOne, subCategoriesService.getOne)
  .put(subCategoriesValidation.updateOne, subCategoriesService.updateOne)
  .delete(subCategoriesValidation.deleteOne, subCategoriesService.deleteOne);

export default subCategoriesRoute;
