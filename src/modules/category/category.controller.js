import slugify from "slugify";
import categoryModel from "../../../databases/models/category.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.js";
export const addCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();
  res.status(201).json({ message: "Success", category });
});

export const getAllCategories = catchError(async (req, res) => {
  let categories = await categoryModel.find();
  res.status(200).json({ message: "Success", categories });
});
export const updateCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  req.body.slug = slugify(req.body.name);
  let category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  //   !category && res.status(404).json({ message: "Category not found" });
  !category && next(new AppError("Category not found", 404));
  category && res.status(200).json({ message: "Success", category });
});
export const deleteCategory = deleteOne(categoryModel, "Category");
