import { Router, Request, Response, NextFunction } from "express";
import productsService from "./products.service";
import productsValidation from "./products.validation";
import multer from "multer";
import sharp from "sharp";





const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const productsRoute: Router = Router({ mergeParams: true });

productsRoute
  .route("/")
  .get(productsService.getAll)
  .post(
    productsService.uploadImages,
    productsService.saveImage,
    productsValidation.createOne,
    productsService.createOne
  );

productsRoute
  .route("/:id")
  .get(productsValidation.getOne, productsService.getOne)
  .put(
    productsService.uploadImages,
    productsService.saveImage,
    productsValidation.updateOne,
    productsService.updateOne)
  .delete(productsValidation.deleteOne, productsService.deleteOne);

export default productsRoute;
