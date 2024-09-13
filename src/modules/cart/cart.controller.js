import cartModel from "../../../databases/models/cart.model.js";
import couponModel from "../../../databases/models/coupon.model.js";
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
export const removeProductFromCart = catchError(async(req, res, next) => {
  let result = await cartModel.findOneAndUpdate({user: req.user._id}, {$pull: {cartItems: {_id: req.params.id}}});
  !result && next(new AppError("Cart not found", 404));
  calcTotalPrice(result);
  result && res.status(200).json({message: "Success", cart: result});
})
export const updateQuantity = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id).select("price");
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

 

  let isCartExists = await cartModel.findOne({ user: req.user._id });

  
  let item = isCartExists.cartItems.find(
    (elm) => elm.product.toString() === req.params.id
  );

  if (item) {
    item.quantity = req.body.quantity;
  } 
  

  calcTotalPrice(isCartExists);

  await isCartExists.save();

  return res
    .status(201)
    .json({ message: "Success", cart: isCartExists });
});
export const getLoggedUserCart = catchError(async(req, res, next) => {
  let cartItems = await cartModel.findOne({user: req.user._id}).populate("cartItems.product");
  res.status(201).json({message: "Success", cart: cartItems});
})
export const applyCoupon = catchError(async(req, res, next) => {
  let coupon = await couponModel.findOne({code: req.body.code, expires: {$gt: date.now()}});
  let cart = await cartModel.findOne({use:req.user._id});
  cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  await cart.save();
  res.status(200).json({message: "Success!", cart});
})