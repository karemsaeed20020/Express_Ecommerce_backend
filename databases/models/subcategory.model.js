import mongoose, { Schema, Types } from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [2, 'too short for subcategory name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'category',
    }
}, {timestamps: true});
const subCategoryModel = mongoose.model("subCategory",  subCategorySchema);
export default subCategoryModel;