import express from 'express';
import * as categoryController from './category.controller.js';
const categoryRouter = express.Router();

categoryRouter.post("/",categoryController.addCategory);

export default categoryRouter;