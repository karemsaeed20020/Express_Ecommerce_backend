import userModel from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const signUp = catchError(async (req, res, next) => {
  let isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) {
    return next(new AppError("Account is already exists", 409));
  }
  const user = new userModel(req.body);
  await user.save();
  const token = jwt.sign(
    { email: user.email, id: user._id, role: user.role, name: user.name },
    process.env.SECRET_KEY
  );
  res.status(201).json({ message: "Success", token });
});
export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new AppError("Incorrect email or password", 404));
  } else {
    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role, name: user.name },
      process.env.SECRET_KEY
    );
    res.status(201).json({ message: "Success", token });
  }
});
export const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;

  if (!token) {
    return next(new AppError("Token not provided", 401));
  }

  // Verify the token
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  
  // Find the user associated with the token
  let user = await userModel.findById(decoded.id);

  if (!user) {
    return next(new AppError("Invalid token", 401));
  }

  // If the user has changed their password after the token was issued
  if (user.passwordChangedAt) {
    // Convert `passwordChangedAt` to a timestamp and compare it with the token's `iat`
    let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000);
    
    if (changePasswordDate > decoded.iat) {
      return next(new AppError("Token is no longer valid. Please log in again.", 401));
    }
  }

  // Everything is fine, attach user info to the request
  req.user = user;
  next();
});

export const allowedTo = (...roles) => {
  return catchError(async(req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authorized to access this route. you are" + req.user.role, 401))
    }
    next();
  })
}