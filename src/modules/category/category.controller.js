import slugify from 'slugify';
import categoryModel from '../../../databases/models/category.model.js';
export const addCategory = async (req, res) => {
    req.body.slug = slugify(req.body.name);
    const category = new categoryModel(req.body);
    await category.save();
    res.status(201).json({message: "Success", category})
}

export const getAllCategories = async (req, res) => {
    let categories = await categoryModel.find();
    res.status(200).json({message: "Success", categories});
}
export const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    req.body.slug = slugify(req.body.name);
    let category = await categoryModel.findByIdAndUpdate(id, req.body, {new: true});
    !category && res.status(404).json({message: "Category not found"});
    category && res.status(200).json({message: "Success",category});
}
export const deleteCategory = async (req, res) => {
    const {id} = req.params;
    let category = await categoryModel.findByIdAndDelete(id);
    !category && res.status(404).json({message: "Category not found"});
    category && res.status(200).json({message: "Success",category});
}