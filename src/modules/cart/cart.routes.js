import express from 'express';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import * as cartController from './cart.controller.js'
const cartRouter = express.Router();

cartRouter.route('/').post(protectedRoutes, allowedTo("user"), cartController.addProductToCart);

export default cartRouter;