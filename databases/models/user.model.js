import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
        unique: true,
        trim: true,
        minLength: [1, "too short user name"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email must be unique"],
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "minLength 6 characters"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: Date,
    verified: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    wishlist: [{type: mongoose.SchemaTypes.ObjectId, ref: "product"}],
    addresses: [{
        city: String,
        street: String,
        phone: String,
    }]
}, {timestamps: true})
userSchema.pre("save", function() {
    this.password = bcrypt.hashSync(this.password, 8);
})
userSchema.pre("findOneAndUpdate", function() {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8);
})
const userModel = mongoose.model("user", userSchema);
export default userModel;