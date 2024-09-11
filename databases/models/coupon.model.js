import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'coupon code is required'],
        trim: true,
        unique: true
    },
    expires: {
        type: Date,
        required: [true, 'coupon date is required'],  // Ensure this is a valid Date
    },
    discount: {
        type: Number,
        required: [true, 'coupon discount is required'],
        min: 0
    }
}, {timestamps: true});

const couponModel = mongoose.model('Coupon', couponSchema);
export default couponModel;
