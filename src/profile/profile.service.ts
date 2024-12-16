import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../users/users.interface";
import refactorService from "../refactor.service";
import usersSchema from "../users/users.schema";
import ApiErrors from "../utils/apiErrors";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
import sharp from "sharp";
import bcrypt from "bcryptjs";
import createTokens from "../utils/tokens";
import sanitization from "../utils/sanitization";

// CRUD operations
class UsersService {

  // Set Users Id method
  setUserId = (req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.user?._id;
    next();
  }

  // get one method
  getOne = refactorService.getOne<Users>(usersSchema);

  // Update Method
  updateOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findByIdAndUpdate(
        req.user._id,
        { name: req.body.name, image: req.body.image },
        { new: true }
      );
      if (!user) return next(new ApiErrors(`req.__{'not_found'}`, 400));
      res.status(200).json({ data: sanitization.User(user) });
    }
  );

  // Delete Method
  deleteOne = refactorService.deleteOne<Users>(usersSchema);

  // Create Password method
  createPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findOneAndUpdate({
        _id: req.user._id,
        hasPassword: false
      },
        {
          password: await bcrypt.hash(req.body.password, 13),
        },
        { new: true }
      );
      const token = createTokens.accessToken(user?._id, user?.role!);
      if (!user) return next(new ApiErrors(`${req.__("not_found")}`, 404));
      res.status(200).json({ data: sanitization.User(user) });
    }
  );

  // change password method     
  changePassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findByIdAndUpdate(
        req.user._id,
        {
          password: await bcrypt.hash(req.body.password, 13),
          passwordChangedAt: Date.now(),
        },
        { new: true }
      );
      const token = createTokens.accessToken(user?._id, user?.role!);
      if (!user) return next(new ApiErrors(`${req.__("not_found")}`, 404));
      res.status(200).json({ token, data: sanitization.User(user) });
    }
  );

  // upload Images method
  uploadImage = uploadSingleFile(["image"], "image");
  saveImage = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const fileName: string = `user-${Date.now()}-image.webp`;
      await sharp(req.file.buffer)
        .resize(1200, 1200)
        .webp({ quality: 95 })
        .toFile(`uploads/images/users/${fileName}`);
      req.body.image = fileName;
    }
    next();
  };
}

const usersService = new UsersService();

export default usersService;
