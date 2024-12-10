import { uploadSingleFile } from './../middlewares/uploadFiles.middleware';
// imports
import productsSchema from "./products.schema";
import { Products } from "./products.interface";
import refactorService from "../refactor.service";
import { Request, Response, NextFunction } from "express";
import sharp from "sharp";

// CRUD operations
class ProductsService {

  //Show method
  getAll = refactorService.getAll<Products>(productsSchema, "products");

  // Create Method
  createOne = refactorService.getAll<Products>(productsSchema);

  // get one method
  getOne = refactorService.getAll<Products>(productsSchema);

  // Update Method
  updateOne = refactorService.getAll<Products>(productsSchema);

  // Delete Method
  deleteOne = refactorService.getAll<Products>(productsSchema);

  // uploded method
  uploadImages = uploadSingleFile(["images"], "cover")

  saveImage = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const fileName: string = `product-${Date.now()}-cover.webp`;
      await sharp(req.file.buffer)
        .resize(1200, 1200)
        .webp({ quality: 95 })
        .toFile(`uploads/images/products/${fileName}`);
      req.body.cover = fileName;
    }
    next();
  }

}

const productsService = new ProductsService();

// exports
export default productsService;
