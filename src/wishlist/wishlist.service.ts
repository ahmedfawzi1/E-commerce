import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../users/users.interface";
import usersSchema from "../users/users.schema";
import ApiErrors from "../utils/apiErrors";
import sanitization from "../utils/sanitization";

// CRUD operations
class WishlistService {

  // get Method
  getWishlist = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema
        .findById(req.user._id)
        .populate("wishlist");
      if (!user) return next(new ApiErrors(`req.__{'not_found'}`, 400));
      res
        .status(200)
        .json({ length: user.wishlist.length, data: user.wishlist });
    }
  );

  // add Method
  addToWishlist = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { wishlist: req.body.productId } },
        { new: true }
      );
      if (!user) return next(new ApiErrors(`req.__{'not_found'}`, 400));
      
      await user.populate('wishlist');
      res
        .status(200)
        .json({ length: user.wishlist.length, data: user.wishlist });
    }
  );

  // remove Method
  removeFromWishlist = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: Users | null = await usersSchema.findByIdAndUpdate(
        req.user._id,
        { $pull: { wishlist: req.params.productId } },
        { new: true }
      );
      if (!user) return next(new ApiErrors(`req.__{'not_found'}`, 400));
      
      await user.populate('wishlist');
      res
        .status(200)
        .json({ length: user.wishlist.length, data: user.wishlist });
    }
  );
}

const wishlistService = new WishlistService();

export default wishlistService;
