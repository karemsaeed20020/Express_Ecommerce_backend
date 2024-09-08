import express from 'express';
import * as productController from './product.controller.js'
import { uploadMixOfFiles } from '../../multer/multer.js';
const productRouter = express.Router();
let arrOfFiles = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 20 }]
productRouter.route("/").post(uploadMixOfFiles(arrOfFiles,"product"),productController.createProduct).get(productController.getAllProducts);
productRouter.route("/:id").get(productController.getProduct).put(productController.updateProduct).delete(productController.deleteProduct)

export default productRouter;