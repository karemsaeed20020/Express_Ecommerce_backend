import express from 'express';
import * as reviewController from './review.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const reviewRouter = express.Router();

reviewRouter.route("/").post(protectedRoutes, allowedTo("user"),reviewController.createReview).get(reviewController.getAllReviews);
reviewRouter.route("/:id").get(reviewController.getReview).put(protectedRoutes,allowedTo("user"),reviewController.updateReview).delete(protectedRoutes, allowedTo("admin", "user"),reviewController.deleteReview);

export default reviewRouter;