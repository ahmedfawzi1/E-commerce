import { body, param } from "express-validator";
import categoriesSchema from "./subCategories.schema";
import validatorMiddleware from "../middlewares/validator.middleware";
import subCategoriesSchema from "./subCategories.schema";

class SubCategoriesValidation {

    createOne = [
        body("name")
        .notEmpty().withMessage((val, {req})=> req._('validation_field'))
        .isLength({ min: 2, max: 50 }).withMessage((val, {req})=> req._('validation_length_short')),
       
        body("description")
        .notEmpty().withMessage((val, {req})=> req._('validation_field'))
        .isLength({ min: 2, max: 999 }).withMessage((val, {req})=> req._('validation_length_long')),
        
        body("price")
        .notEmpty().withMessage((val, {req})=> req._('validation_field'))
        .isFloat({ min: 2, max: 1000000 }).withMessage((val, {req})=> req._('validation_length_long')),
        
        body("discount").optional()
        .isFloat({ min: 2, max: 100 }).withMessage((val, {req})=> req._('validation_length_medium'))
        .custom(( val, {req} ) =>{
          req.body.priceAfterDiscount = req.body.price - (req.body.price * val / 100)
          return true;
        }),

        body("quantity").optional()
        .isInt({ min: 2, max: 1000 }).withMessage((val, {req})=> req._('validation_length_long')),
       

        body("category")
        .notEmpty().withMessage((val, {req})=> req._('validation_value'))
        .isMongoId().withMessage((val, {req})=> req._('invalid_id'))
        .custom(async (val: string, {req}) => {
          const category = await categoriesSchema.findById(val);
          if (!category) throw new Error(`${req._('not_found')}`);
          return true;
        }), validatorMiddleware,

        body("subCategory")
        .notEmpty().withMessage((val, {req})=> req._('validation_value'))
        .isMongoId().withMessage((val, {req})=> req._('invalid_id'))
        .custom(async (val: string, {req}) => {
          const subCategory = await subCategoriesSchema.findById(val);
          if (!subCategory) throw new Error(`${req._('not_found')}`);
          if(subCategory.category._id!.toString() !== req.body.category.toString()) throw new Error(`${req._('not_found')}`)
          return true;
        }), validatorMiddleware 
     ];
    
    updateOne = [
        param("id").isMongoId().withMessage((val, {req})=> req._('invalid_id')),

        body("name").optional().isLength({ min: 2, max: 50 }).withMessage((val, {req})=> req._('validation_length_short')),

        body("description").optional()
        .isLength({ min: 2, max: 999 }).withMessage((val, {req})=> req._('validation_length_long')),
        
        body("price").optional()
        .isFloat({ min: 2, max: 1000000 }).withMessage((val, {req})=> req._('validation_length_long')),
        
        body("discount").optional()
        .isFloat({ min: 2, max: 100 }).withMessage((val, {req})=> req._('validation_length_medium'))
        .custom(( val, {req} ) =>{
          req.body.priceAfterDiscount = req.body.price - (req.body.price * val / 100)
          return true;
        }),

        body("quantity").optional()
        .isInt({ min: 2, max: 1000 }).withMessage((val, {req})=> req._('validation_length_long')),
       

        body("category").optional()
        .isMongoId().withMessage((val, {req})=> req._('invalid_id'))
        .custom(async (val: string, {req}) => {
          const category = await categoriesSchema.findById(val);
          if (!category) throw new Error(`${req._('not_found')}`);
          return true;
        }), validatorMiddleware,

        body("subCategory").optional()
        .isMongoId().withMessage((val, {req})=> req._('invalid_id'))
        .custom(async (val: string, {req}) => {
          const subCategory = await subCategoriesSchema.findById(val);
          if (!subCategory) throw new Error(`${req._('not_found')}`);
          if(subCategory.category._id!.toString() !== req.body.category.toString()) throw new Error(`${req._('not_found')}`)
          return true;
        }), validatorMiddleware 

      ];

    getOne = [
      param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
      validatorMiddleware
      ];

    deleteOne = [
      param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
      validatorMiddleware
      ];
}

const subCategoriesValidation = new SubCategoriesValidation();

export default subCategoriesValidation;