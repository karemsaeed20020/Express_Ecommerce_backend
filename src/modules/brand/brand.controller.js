import brandModel from "../../../databases/models/brand.model.js"
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js"
import slugify from "slugify";
import { deleteOne } from "../handlers/factor.js";
export const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    const brand = new brandModel(req.body);
    await brand.save();
    res.status(201).json({message: "Success!", brand});
})
export const getAllBrands = catchError(async (req, res, next) => {
    const brand = await brandModel.find();
    res.status(200).json({message: "Success!", brand});
})
export const updateBrand = catchError(async (req, res, next) => {
    const {id} = req.params;
    req.body.slug = slugify(req.body.name);
    let Brand = await brandModel.findByIdAndUpdate(id, req.body, {new: true});
    !Brand && next(new AppError("Brand not found", 404));
    Brand && res.status(200).json({message: "Success", Brand});
})
export const deleteBrand = deleteOne(brandModel, "Brand");