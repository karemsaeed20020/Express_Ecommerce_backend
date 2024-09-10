import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema({
    comment: {
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
    ratings: {
        type: Number,
        min: 1,
        max: 5
    }
}, {timestamps: true});
reviewSchema.pre(/^find/, function() {
    this.populate('user', 'name -_id');
})
const reviewModel = mongoose.model("review", reviewSchema);
export default reviewModel;