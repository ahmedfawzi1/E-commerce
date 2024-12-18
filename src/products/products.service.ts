import { Request, Response, NextFunction } from "express";
import { Products } from "./products.interface";
import productsSchema from "./products.schema";
import refactorService from "../refactor.service";
import { uploadMultiFiles } from "./../middlewares/uploadFiles.middleware";
import sharp from "sharp";

// CRUD operations
class ProductsService {
  //Show method
  getAll = refactorService.getAll<Products>(productsSchema, "products");

  // Create Method
  createOne = refactorService.createOne<Products>(productsSchema);

  // get one method
  getOne = refactorService.getOne<Products>(productsSchema, 'products', 'reviews');

  // Update Method
  updateOne = refactorService.updateOne<Products>(productsSchema);

  // Delete Method
  deleteOne = refactorService.deleteOne<Products>(productsSchema);

  // uploded method
  uploadImages = uploadMultiFiles(
    ["images"],
    [
      { name: "cover", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]
  );



  saveImage = async (req: Request, res: Response, next: NextFunction) => {
    if (req.files) {
      if (req.files.cover) {
        const fileName: string = `product-${Date.now()}-cover.webp`;
        await sharp(req.files.cover[0].buffer)
          .resize(1200, 1200)
          .webp({ quality: 95 })
          .toFile(`uploads/images/products/${fileName}`);
        req.body.cover = fileName;
      }

      if (req.files.images) {
        req.files.images = [];
        await Promise.all(
          req.files.images.map(async (image: any, index: number) => {
            const fileName: string = `product-${Date.now()}-image-NO.${
              index + 1
            }.webp`;
            await sharp(image.buffer)
              .resize(1200, 1200)
              .webp({ quality: 95 })
              .toFile(`uploads/images/products/${fileName}`);

            req.body.images.push(fileName);
          })
        );
      }
    }
    next();
  };

  // saveImage = async (req: Request, res: Response, next: NextFunction) => {
  //   if (req.file) {
  //     const fileName: string = `product-${Date.now()}-cover.webp`;
  //     await sharp(req.file.buffer)
  //       .resize(1200, 1200)
  //       .webp({ quality: 95 })
  //       .toFile(`uploads/images/products/${fileName}`);
  //     req.body.cover = fileName;
  //   }
  //   next();
  // }
}

const productsService = new ProductsService();

// exports
export default productsService;
