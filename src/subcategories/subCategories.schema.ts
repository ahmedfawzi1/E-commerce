import mongoose from "mongoose";
import { SubCategories } from "./subCategories.interface";

const subCategoriesSchema = new mongoose.Schema<SubCategories>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    image: String,
  },
  { timestamps: true }
);


subCategoriesSchema.pre<SubCategories>(/^find/, function (next) {
  this.populate({ path: "category", select: "-_id name image" });
  next();
});

export default mongoose.model<SubCategories>(
  "subCategories",
  subCategoriesSchema
);


