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
