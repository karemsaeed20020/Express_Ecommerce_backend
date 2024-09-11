import express from "express";
import * as couponController from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const couponRouter = express.Router();

couponRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"),couponController.createCoupon)
  .get(couponController.getAllCoupons);
couponRouter
  .route("/:id")
  .get(couponController.getCoupon)
  .put(protectedRoutes, allowedTo("user"),couponController.updateCoupon)
  .delete(protectedRoutes, allowedTo("user", "admin"),couponController.deleteCoupon);

export default couponRouter;
