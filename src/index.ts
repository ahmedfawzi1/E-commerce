import express from "express";
import categoriesRouter from "./categories/categories.route";
import subCategoriesRoute from "./subcategories/subCategories.route";
import globalErrors from "./middlewares/errors.middleware";
import ApiErrors from "./utils/apiErrors";
import productsRoute from "./products/products.route";
import usersRoute from "./users/users.route";
import authRoute from "./auth/auth.route";

declare module "express" {
  interface Request {
    filterData?: any;
    files?: any;
    user?: any;
  }
}
const mountRouts = (app: express.Application) => {
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/subCategories", subCategoriesRoute);
  app.use("/api/v1/products", productsRoute);
  app.use('/api/v1/auth', authRoute);
  app.use("/api/v1/users", usersRoute);


  app.all("*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(new ApiErrors(`route ${req.originalUrl} not found`, 400));
  })
  app.use(globalErrors);
};

export default mountRouts;
