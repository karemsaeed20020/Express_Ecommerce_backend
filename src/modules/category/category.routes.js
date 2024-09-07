import express from 'express';
import * as categoryController from './category.controller.js';
import subCategoryRouter from '../subcategory/subcategory.routes.js';
const categoryRouter = express.Router();
categoryRouter.use('/:category/subcategories', subCategoryRouter);
categoryRouter.route("/").post(categoryController.addCategory).get(categoryController.getAllCategories)

categoryRouter.route("/:id").put(categoryController.updateCategory).delete(categoryController.deleteCategory)

export default categoryRouter;