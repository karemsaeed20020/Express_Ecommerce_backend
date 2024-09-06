import { catchError } from "../../utils/catchError.js";
import productModel from '../../../databases/models/product.model.js';
import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.js";

export const createProduct = catchError(async(req, res, next) => {
    req.body.slug = slugify(req.body.title);
    let result = new productModel(req.body);
    await result.save();
    res.status(200).json({message: "Success", result});

})
export const getAllProducts = catchError(async(req, res, next) => {
    let result = await productModel.find({});
    res.status(200).json({message: "Success", result});
})
export const getProduct = catchError(async(req, res, next) => {
    const {id} = req.params;
    let result = await productModel.findById(id);
    !result && next(new AppError("Product not found", 404));
    result && res.status(200).json({message: "Success", result})    
});
export const updateProduct = catchError(async(req, res, next) => {
    const {id} = req.params;
    if(req.body.title) req.body.slug = slugify(req.body.title);
    let result = await productModel.findByIdAndUpdate(id, req.body, {new: true});
    !result && next(new AppError("Product not found", 404));
    result && res.status(200).json({message: "Success", result})  
});
export const deleteProduct = deleteOne(productModel, "Product")