import { NextFunction, Request, Response } from 'express';
import { Reviews } from "./reviews.interface";
import reviewsSchema from "./reviews.schema";
import refactorService from "../refactor.service";

// CRUD operations
class ReviewsService {

  // set Id method
  setIds(req: Request, res: Response, next: NextFunction) {
    req.body.user = req.user._id;
    req.body.product = req.params.productId;
    next();
  };

  // filter data method
  filterReviews(req: Request, res: Response, next: NextFunction) {
    const filterData: any = {};
    if (req.params.productId) filterData.product = req.params.productId;
    if (!req.params.productId && req.user && req.user.role === 'user') filterData.user = req.user._id
    req.filterData = filterData;
    next();
  };

  //Show method
  getAll = refactorService.getAll<Reviews>(reviewsSchema);

  // Create Method
  createOne = refactorService.createOne<Reviews>(reviewsSchema);

  // get one method
  getOne = refactorService.getOne<Reviews>(reviewsSchema);

  // Update Method
  updateOne = refactorService.updateOne<Reviews>(reviewsSchema);

  // Delete Method
  deleteOne = refactorService.deleteOne<Reviews>(reviewsSchema);
}

const reviewsService = new ReviewsService();

export default reviewsService;
