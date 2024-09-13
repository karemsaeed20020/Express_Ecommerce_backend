import express from 'express';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import * as cartController from './cart.controller.js'
const cartRouter = express.Router();

cartRouter.route('/').post(protectedRoutes, allowedTo("user"), cartController.addProductToCart).get(protectedRoutes, allowedTo("user"), cartController.getLoggedUserCart);
cartRouter.route('/:id').delete(protectedRoutes, allowedTo("user"), cartController.removeProductFromCart).put(protectedRoutes, allowedTo("user"), cartController.updateQuantity);

export default cartRouter;