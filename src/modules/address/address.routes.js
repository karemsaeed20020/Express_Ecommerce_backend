import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as addressController from "./address.controller.js";
const addressRouter = express.Router();

addressRouter
  .route("/")
  .patch(protectedRoutes, allowedTo("user"), addressController.addAddress)
  .delete(protectedRoutes, allowedTo("user"), addressController.removeAddress)
  .get(protectedRoutes, allowedTo("user"), addressController.getAllUserAddress);

export default addressRouter;
