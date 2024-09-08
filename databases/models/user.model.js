import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})
userSchema.pre("save", function() {
    this.password = bcrypt.hashSync(this.password, 8);
})
userSchema.pre("findOneAndUpdate", function() {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8);
})
const userModel = mongoose.model("user", userSchema);
export default userModel;