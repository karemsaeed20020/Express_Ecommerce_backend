import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [10, "too short product name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    price: {
        type: Number,
        default: 0,
        min: 0,
    },
    priceAfterDiscount: {
        type: Number,
        default: 0,
        min: 0,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: [10, "too short product description"],
        maxlength: [100, "description should be less then or equal to 100 characters"],
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    sold: {
        type: Number,
        default: 0,
        min: 0,
    },
    imgCover: {
        type: String,
        // required: true,
    },
    images: {
        type: [String]
    },
    category: {
        type: Schema.ObjectId,
        ref: "category",
        required: true
    },
    subcategory: {
        type: Schema.ObjectId,
        ref: "subCategory",
        required: true
    },
    brand: {
        type: Schema.ObjectId,
        ref: "brand",
        required: true
    },
    ratingAvg: {
        type: Number,
        min: 0,
        max: 5
    },
    ratingCount: {
        type: Number,
        min: 0,
    }
}, {timestamps: true})
const productModel = mongoose.model("product", productSchema);
export default productModel;