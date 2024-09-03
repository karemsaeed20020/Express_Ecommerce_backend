import mongoose, { Types } from "mongoose";

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
        type: Types.ObjectId,
        ref: 'category',
    }
});
const subCategoryModel = mongoose.model("subCategory",  subCategorySchema);
export default subCategoryModel;