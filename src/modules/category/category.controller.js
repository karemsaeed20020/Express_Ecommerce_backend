import slugify from 'slugify';
import categoryModel from '../../../databases/models/category.model.js';
export const addCategory = async (req, res) => {
    req.body.slug = slugify(req.body.name);
    const category = new categoryModel(req.body);
    await category.save();
    res.status(201).json({message: "Success", category})
}