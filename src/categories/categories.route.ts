import { Router } from "express";
import categoriesService from "./categories.service";
import subCategoriesRoute from "../subcategories/subCategories.route";
import categoriesValidation from "./categories.validation";
import authService from "../auth/auth.service";

const categoriesRouter: Router = Router();

categoriesRouter.use("/:categoryId/subCategories", subCategoriesRoute);

categoriesRouter
  .route("/")
  .get(categoriesService.getAll)
  .post(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin", "employee"),
    categoriesValidation.createOne,
    categoriesService.createOne
  );

categoriesRouter
  .route("/:id")
  .get(categoriesValidation.getOne, categoriesService.getOne)
  .put(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin", "employee"),
    categoriesValidation.updateOne,
    categoriesService.updateOne
  )
  .delete(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin", "employee"),
    categoriesValidation.deleteOne,
    categoriesService.deleteOne
  );

export default categoriesRouter;
