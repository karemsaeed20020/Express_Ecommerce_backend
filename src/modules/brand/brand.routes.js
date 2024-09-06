import express from 'express';
import * as brandController from './brand.controller.js'
const brandRouter = express.Router();

brandRouter.route("/").post(brandController.addBrand).get(brandController.getAllBrands);
brandRouter.route("/:id").put(brandController.updateBrand).delete(brandController.deleteBrand)
export default brandRouter;