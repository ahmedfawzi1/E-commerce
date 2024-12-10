import { body, param } from "express-validator";
import categoriesSchema from "./categories.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

class CategoriesValidation {

    createOne = [
        body("name").notEmpty().withMessage( (val, {req})=> req._('validation_field') )
        .isLength({ min: 2, max: 50 }).withMessage((val, {req})=> req._('validation_length_short'))
        .custom(async (val: string, {req}) => {
          const category = await categoriesSchema.findOne({ name: val });
          if (category) throw new Error(`${req.__("not_found")}`);
          return true;
        }), validatorMiddleware 
     ];
    
    updateOne = [
        param("id").isMongoId().withMessage((val, {req})=> req._('invalid_id')),
        body("name").optional()
        .isLength({ min: 2, max: 50 }).withMessage((val, {req})=> req._('validation_length_short'))
        .custom(async (val: string, {req}) => {
          const category = await categoriesSchema.findOne({ name: val });
          if (category && category._id!.toString() !== req.params?.id.toString()) throw new Error(`${req.__("validation_value")}`);
          return true;
        }), validatorMiddleware 
      ];

    getOne = [
        param("id").isMongoId().withMessage((val, {req})=> req._('invalid_id')),
        body("name").optional()
        .isLength({ min: 2, max: 50 }).withMessage((val, {req})=> req._('validation_length_short'))
        .custom(async (val: string, {req}) => {
          const category = await categoriesSchema.findOne({ name: val });
          if (category && category._id!.toString() !== req.params?.id.toString()) throw new Error(`${req.__("validation_value")}`);
          return true;
        }), validatorMiddleware 
      ];

    deleteOne = [
        param("id").isMongoId().withMessage((val, {req})=> req._('invalid_id')),
        body("name").optional()
        .isLength({ min: 2, max: 50 }).withMessage((val, {req})=> req._('validation_length_short'))
        .custom(async (val: string, {req}) => {
          const category = await categoriesSchema.findOne({ name: val });
          if (category && category._id!.toString() !== req.params?.id.toString()) throw new Error(`${req.__("validation_value")}`);
          return true;
        }), validatorMiddleware 
      ];
}

const categoriesValidation = new CategoriesValidation();

export default categoriesValidation;