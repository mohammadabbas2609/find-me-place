import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

const verifyUser = asyncHandler((req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorResponse("Please login to access this route", 403));
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (!verified) {
    return next(new ErrorResponse("Token tampered", 401));
  }

  req.user = {
    user: verified.user,
    email: verified.email,
  };
  next();
});

export default verifyUser;
