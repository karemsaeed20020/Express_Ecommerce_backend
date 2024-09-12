import cartModel from "../../../databases/models/cart.model.js";
import productModel from "../../../databases/models/product.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((elm) => {
    const itemPrice = Number(elm.price) || 0;
    const itemQuantity = Number(elm.quantity) || 1;

    totalPrice += itemQuantity * itemPrice;
  });

  cart.totalPrice = !isNaN(totalPrice) ? totalPrice : 0;
};

export const addProductToCart = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  req.body.price = product.price;

  let isCartExists = await cartModel.findOne({ user: req.user._id });

  if (!isCartExists) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [
        {
          product: req.body.product,
          quantity: req.body.quantity || 1,
          price: req.body.price,
        },
      ],
    });

    calcTotalPrice(cart);

    await cart.save();
    return res.status(201).json({ message: "Success", cart });
  }

  let item = isCartExists.cartItems.find(
    (elm) => elm.product.toString() === req.body.product
  );

  if (item) {
    item.quantity += req.body.quantity || 1;
  } else {
    isCartExists.cartItems.push({
      product: req.body.product,
      quantity: req.body.quantity || 1,
      price: req.body.price,
    });
  }

  calcTotalPrice(isCartExists);

  await isCartExists.save();

  return res
    .status(201)
    .json({ message: "Product added to cart", cart: isCartExists });
});
