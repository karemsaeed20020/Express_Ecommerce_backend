import { catchError } from "../../utils/catchError.js"
import userModel from '../../../databases/models/user.model.js'
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.js";
export const addUser = catchError(async(req, res, next) => {
    const User = new userModel(req.body);
    await User.save();
    res.status(201).json({message: "Success", User})
})
export const getAllUsers = catchError(async(req, res, next) => {
    const Users = await userModel.find({});
    res.status(200).json({message: "Success", Users});
})
export const getUser = catchError(async(req, res, next) => {
    const {id} = req.params;
    const User = await userModel.findById(id);
    !User && next(new AppError("User not found", 404));
    User && res.status(200).json({message: "Success", User});
});
export const updateUser = catchError(async(req, res, next) => {
    const {id} = req.params;
    const User = await userModel.findByIdAndUpdate(id, req.body, {new: true});
    !User && next(new AppError("User not found", 404));
    User && res.status(200).json({message: "Success", User});
});
export const deleteUser = deleteOne(userModel, "User");
export const changeUserPassword = catchError(async(req, res, next) => {
    const {id} = req.params;
    req.body.passwordChangedAt = Date.now();
    const User = await userModel.findByIdAndUpdate(id, {password: req.body.password}, {new: true});
    !User && next(new AppError("User not found", 404));
    User && res.status(200).json({message: "Success", User});
})