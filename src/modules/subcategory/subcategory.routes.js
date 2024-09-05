import express from 'express';
const subCategoryRouter = express.Router();
import * as subCategoryController from './subcategory.controller.js';
subCategoryRouter.route("/").post(subCategoryController.addSubCategory).get(subCategoryController.getAllSubCategories);
subCategoryRouter.route("/:id").put(subCategoryController.updateSubCategory).delete(subCategoryController.deleteSubCategory)

export default subCategoryRouter;