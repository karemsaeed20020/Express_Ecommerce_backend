import reviewModel from "../../../databases/models/review.model.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/factor.js";

export const createReview = catchError(async(req, res, next) => {
    req.body.user = req.user._id;
    let isReview = await reviewModel.findOne({user: req.user._id, product: req.body.product});
    if (isReview) {
        return next(new AppError("You are created this comment before", 409));
    }
    let result = new reviewModel(req.body);
    await result.save();
    res.status(200).json({message: "Success", result});
})
export const getAllReviews = catchError(async(req, res, next) => {
    let apiFeatures = new ApiFeatures(reviewModel.find(), req.query).paginate().filter().sort().fields().search();
    let result = await apiFeatures.mongooseQuery;
    res.status(200).json({message: "Success", page: apiFeatures.page, result});
});
export const getReview = catchError(async(req, res, next) => {
    const {id} = req.params;
    let result = await reviewModel.findById(id);
    !result && next(new AppError("Review not found", 404));
    result && res.status(200).json({message: "Success", result});
});
export const updateReview = catchError(async(req, res, next) => {
    const {id} = req.params;
    let result = await reviewModel.findOneAndUpdate({_id: id, user:req.user._id}, req.body, {new: true});
    !result && next(new AppError("Review not found or you are not authorized to perform this action", 404));
    result && res.status(200).json({message: "Success", result});
});
export const deleteReview = deleteOne(reviewModel, "Review");