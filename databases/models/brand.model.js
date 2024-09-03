import mongoose from 'mongoose';
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    slug: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        // required: true,
    }
}, {timestamps: true})
const brandModel = mongoose.model("brand", brandSchema);
export default brandModel;