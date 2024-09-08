import express from 'express';
import * as userController from './user.controller.js'
const userRouter = express.Router();

userRouter.route('/').post(userController.addUser).get(userController.getAllUsers);
userRouter.route("/:id").get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser).patch(userController.changeUserPassword);
export default userRouter;
