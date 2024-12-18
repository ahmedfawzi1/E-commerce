import { Router } from "express";
import subCategoriesService from "./subCategories.service";
import subCategoriesValidation from "./subCategories.validation";
import authService from "../auth/auth.service";

const subCategoriesRoute: Router = Router({ mergeParams: true });

subCategoriesRoute
  .route("/")
  .get(subCategoriesService.filterSubCategories, subCategoriesService.getAll)
  .post(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin", "employee"),
    subCategoriesService.setCategoryId,
    subCategoriesValidation.createOne,
    subCategoriesService.createOne
  );

subCategoriesRoute
  .route("/:id")
  .get(subCategoriesValidation.getOne, subCategoriesService.getOne)
  .put(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin", "employee"),
    subCategoriesValidation.updateOne,
    subCategoriesService.updateOne
  )
  .delete(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin", "employee"),
    subCategoriesValidation.deleteOne,
    subCategoriesService.deleteOne
  );

export default subCategoriesRoute;
