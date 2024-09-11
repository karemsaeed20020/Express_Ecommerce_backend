import couponModel from "../../../databases/models/coupon.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import { deleteOne } from "../handlers/factor.js";
import qrcode from 'qrcode';
export const createCoupon = catchError(async(req, res, next) => {
    let result = new couponModel(req.body);
    await result.save();
    res.status(201).json({message: "Success", result});
})
export const getAllCoupons = catchError(async(req, res, next) => {
    let apiFeatures = new ApiFeatures(couponModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .sort()
    .search();
  // execute query
  let result = await apiFeatures.mongooseQuery;
  res.status(200).json({ message: "Success", page:apiFeatures.page, result });
});
export const getCoupon = catchError(async(req, res, next) => {
    const {id} = req.params;
    const coupon = await couponModel.findById(id);
    let url = await qrcode.toDataURL("I am pony!")
    !coupon && next(new AppError("Coupon not found", 404));
    coupon && res.status(200).json({ message: "Success", coupon, url });
})

export const updateCoupon = catchError(async(req, res, next) => {
    const {id} = req.params;
    let result = await couponModel.findByIdAndUpdate(id, req.body, {new: true});
    !result && next(new AppError("Coupon not found", 401));
    result && res.status(200).json({message: "Success", result});
})
export const deleteCoupon = deleteOne(couponModel, 'Coupon')