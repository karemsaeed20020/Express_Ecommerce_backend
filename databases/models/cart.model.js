import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  cartItems: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
      },
      totalProductDiscount: Number,
    },
  ],
  totalPrice: Number,
  totalPriceAfterDiscount: Number,
  discount: Number,
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
