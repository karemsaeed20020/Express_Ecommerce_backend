import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: "user",
        required: true,
    },
    product: {
        type: Schema.ObjectId,
        ref: "product",
        required: true,
    },
    rate: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
}, {timestamps: true});
const reviewModel = mongoose.model("review", reviewSchema);
export default reviewModel;