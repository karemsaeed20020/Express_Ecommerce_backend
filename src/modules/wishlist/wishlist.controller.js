import userModel from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

export const addToWishlist = catchError(async(req, res, next) => {
    const {product} = req.body;
    let result = await userModel.findByIdAndUpdate(req.user._id, {$addToSet: {wishlist: product}}, {new: true});
    !result && next(new AppError("Wishlist not found", 401));
    result && res.status(200).json({message: "Success", result: result.wishlist})
});
export const removeFromWishlist = catchError(async(req, res, next) => {
    const {product} = req.body;
    let result = await userModel.findByIdAndUpdate(req.user._id, {$pull: {wishlist: product}}, {new: true});
    !result && next(new AppError("Wishlist not found", 401));
    result && res.status(200).json({message: "Success", result: result.wishlist})
});
export const getAllUserWishlist = catchError(async(req, res, next) => {
    let result = await userModel.findOne({_id: req.user._id}).populate("wishlist")
    !result && next(new AppError("Wishlist not found", 401));
    result && res.status(200).json({message: "Success", result: result.wishlist})
});