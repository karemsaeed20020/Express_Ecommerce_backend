import express from 'express';
import * as categoryController from './category.controller.js';
import subCategoryRouter from '../subcategory/subcategory.routes.js';
import { validate } from '../../middleware/validation.js';
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from './category.validation.js';
const categoryRouter = express.Router();
categoryRouter.use('/:category/subcategories', subCategoryRouter);
categoryRouter.route("/").post(validate(addCategoryValidation),categoryController.addCategory).get(categoryController.getAllCategories)

categoryRouter.route("/:id").put(validate(updateCategoryValidation),categoryController.updateCategory).delete(validate(deleteCategoryValidation),categoryController.deleteCategory)

export default categoryRouter;