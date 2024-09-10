import express from "express";
import * as wishlistController from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const wishlistRouter = express.Router();

wishlistRouter
  .route("/")
  .patch(protectedRoutes, allowedTo("user"), wishlistController.addToWishlist)
  .delete(
    protectedRoutes,
    allowedTo("user"),
    wishlistController.removeFromWishlist
  ).get(protectedRoutes, allowedTo("user"),wishlistController.getAllUserWishlist);

export default wishlistRouter;
