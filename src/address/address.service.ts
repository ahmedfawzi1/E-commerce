import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../users/users.interface";
import usersSchema from "../users/users.schema";
import ApiErrors from "../utils/apiErrors";
import sanitization from "../utils/sanitization";

// CRUD operations
class AddressService {

  // get Method
  getAddress = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findById(req.user._id)
      if (!user) return next(new ApiErrors(`req.__{'not_found'}`, 400));
      res
        .status(200)
        .json({ length: user.wishlist.length, data: user.wishlist });
    }
  );

  // add Method
  addAddress = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { address: req.body.address } },
        { new: true }
      );
      if (!user) return next(new ApiErrors(`req.__{'not_found'}`, 400));

      res
        .status(200)
        .json({ length: user.address.length, data: user.address });
    }
  );

  // remove Method
  removeAddress = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findByIdAndUpdate(
        req.user._id,
        { $pull: { address: { _id: req.params.addressId } } },
        { new: true }
      );
      if (!user) return next(new ApiErrors(`req.__{'not_found'}`, 400));

      res
        .status(200)
        .json({ length: user.address.length, data: user.address });
    }
  );
}

const addressService = new AddressService();

export default addressService;
