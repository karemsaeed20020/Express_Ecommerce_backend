import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [1, "too short for category name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        type: String,
        // required: true,
    }
}, {timestamps: true});
const categoryModel = mongoose.model('category', categorySchema);
export default categoryModel;