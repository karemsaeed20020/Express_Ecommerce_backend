import userModel from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

export const addAddress = catchError(async(req, res, next) => {
    let result = await userModel.findByIdAndUpdate(req.user._id, {$addToSet: {addresses: req.body}}, {new: true})
    !result && next(new AppError("Addresses not found", 401));
    result && res.status(200).json({message: "Success", result: result.addresses})
})
export const removeAddress = catchError(async(req, res, next) => {
    let result = await userModel.findByIdAndUpdate(req.user._id, {$pull: {addresses: {_id: req.body.address}}}, {new: true})
    !result && next(new AppError("Addresses not found", 401));
    result && res.status(200).json({message: "Success", result: result.addresses})
})
export const getAllUserAddress = catchError(async(req, res, next) => {
    let result = await userModel.findOne({_id: req.user._id})
    !result && next(new AppError("Addresses not found", 401));
    result && res.status(200).json({message: "Success", result: result.addresses})
})