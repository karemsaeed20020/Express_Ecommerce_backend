import express from 'express';
import * as productController from './product.controller.js'
const productRouter = express.Router();

productRouter.route("/").post(productController.createProduct).get(productController.getAllProducts);
productRouter.route("/:id").get(productController.getProduct).put(productController.updateProduct).delete(productController.deleteProduct)

export default productRouter;