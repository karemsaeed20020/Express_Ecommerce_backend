import mongoose from 'mongoose';
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0
    }
}, {timestamps: true})
const couponModel = mongoose.model('coupon', couponSchema);
export default couponModel;