import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: true,
      trim: true,
      minlength: [10, "Too short product name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      default: 0,
      min: [0, "Price cannot be below 0"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "Discount price cannot be below 0"],
      validate: {
        validator: function (val) {
          // priceAfterDiscount should be lower than price
          return val < this.price;
        },
        message: "Discount price should be below regular price",
      },
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
      minlength: [10, "Too short product description"],
      maxlength: [1000, "Description should be less than or equal to 1000 characters"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be below 0"],
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, "Sold quantity cannot be below 0"],
    },
    imgCover: {
      type: String,
      default: null, // Set default to null if not required
    },
    images: {
      type: [String],
      default: [], // Default to an empty array if not required
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Product category is required"],
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
      required: [true, "Product subcategory is required"],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: [true, "Product brand is required"],
    },
    ratingAvg: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: [0, "Rating count cannot be negative"],
    },
  },
  { timestamps: true }
);
productSchema.post("init", function(doc) {
  doc.imgCover = process.env.BASE_URL + "product/" + doc.imgCover;
  doc.images = doc.images.map((elm) => process.env.BASE_URL+"product/"+elm)
});

const productModel = mongoose.model("product", productSchema);
export default productModel;
