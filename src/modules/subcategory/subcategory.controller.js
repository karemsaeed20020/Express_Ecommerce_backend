import slugify from "slugify";
import subCategoryModel from "../../../databases/models/subcategory.model.js";
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js";
export const addSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const subCategory = new subCategoryModel(req.body);
    await subCategory.save();
    res.status(201).json({message:  "Success", subCategory})
})
export const getAllSubCategories = catchError(async (req, res, next) => {
    const subCategories = await subCategoryModel.find();
    res.status(200).json({message: "Success", subCategories});
})
export const updateSubCategory = catchError(async(req, res, next) => {
    const {id} = req.params;
    if (req.body.name) req.body.slug = slugify(req.body.name)
    let SubCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {new: true});
    !SubCategory && next(new AppError("SubCategory not found", 404));
    SubCategory && res.status(200).json({message: "Success", SubCategory})
})
export const deleteSubCategory = catchError(async(req, res, next) => {
    const {id} = req.params;
    let SubCategory = await subCategoryModel.findByIdAndDelete(id);
    !SubCategory && next(new AppError("SubCategory not found", 404));
    SubCategory && res.status(200).json({message: "Success", SubCategory})
});

