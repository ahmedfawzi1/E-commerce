import { Coupons } from "./coupons.interface";
import couponsSchema from "./coupons.schema";
import refactorService from "../refactor.service";

// CRUD operations
class CouponsService {
  //Show method
  getAll = refactorService.getAll<Coupons>(couponsSchema);

  // Create Method
  createOne = refactorService.createOne<Coupons>(couponsSchema);

  // get one method
  getOne = refactorService.getOne<Coupons>(couponsSchema);

  // Update Method
  updateOne = refactorService.updateOne<Coupons>(couponsSchema);

  // Delete Method
  deleteOne = refactorService.deleteOne<Coupons>(couponsSchema);
}

const couponsService = new CouponsService();
export default couponsService;
