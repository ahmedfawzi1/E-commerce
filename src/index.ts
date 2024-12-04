import express from "express";
import categoriesRouter from "./categories/categories.route";
import subCategoriesRoute from "./subcategories/subCategories.route"

declare module "express" {
    interface Request{
        filterData?: any;
    }
}
const mountRouts = (app: express.Application) => {
    app.use("/api/v1/categories", categoriesRouter);
    app.use("/api/v1/subCategories", subCategoriesRoute);
};

export default mountRouts;
