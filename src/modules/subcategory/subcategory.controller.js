import slugify from "slugify";
import subCategoryModel from "../../../databases/models/subcategory.model.js";
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.js";
export const addSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const subCategory = new subCategoryModel(req.body);
    await subCategory.save();
    res.status(201).json({message:  "Success", subCategory})
})
export const getAllSubCategories = catchError(async (req, res, next) => {
    let filterObj = {};
    if (req.params.category) {
        filterObj = req.params
    }
    const subCategories = await subCategoryModel.find(filterObj);
    res.status(200).json({message: "Success", subCategories});
})
export const updateSubCategory = catchError(async(req, res, next) => {
    const {id} = req.params;
    if (req.body.name) req.body.slug = slugify(req.body.name)
    let SubCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {new: true});
    !SubCategory && next(new AppError("SubCategory not found", 404));
    SubCategory && res.status(200).json({message: "Success", SubCategory})
})
export const deleteSubCategory = deleteOne(subCategoryModel, "SubCategory");

