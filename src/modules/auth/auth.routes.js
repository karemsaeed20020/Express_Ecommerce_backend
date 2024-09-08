import express from 'express';
import * as authController from './auth.controller.js'
const authRouter = express.Router();
authRouter.route("/signup").post(authController.signUp);
authRouter.route("/login").post(authController.signIn);

export default authRouter;