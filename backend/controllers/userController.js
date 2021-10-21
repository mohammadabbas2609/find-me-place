import asyncHandler from "../middlewares/asyncHandler.js";
import UserModel from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import generateToken from "../utils/generateToken.js";
import imageUpload from "../utils/imageUploader.js";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";

const dateForOneHour = 1000 * 60 * 60;

//@desc     Register the user
//@route    POST /api/user/register
//@access   Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  const token = generateToken(user._id, user.email);

  res.cookie("token", token, { maxAge: dateForOneHour, httpOnly: true });

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

//@desc     User Login
//@route    POST /api/user/login
//@access   Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    next(
      new ErrorResponse(`User with email ${req.body.email} doesnt exists`, 404)
    );
  } else {
    const auth = await user.comparePassword(req.body.password);
    if (!auth) {
      next(new ErrorResponse("Entered password is not correct", 403));
    } else {
      const token = generateToken(user._id, user.email);
      res.cookie("token", token, { maxAge: dateForOneHour, httpOnly: true });

      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  }
});

//@desc   Get Logged in Users profile
//@route  GET /api/user/myprofile
//@access Private
export const getMyProfile = asyncHandler(async (req, res, next) => {
  const { user: userId } = req.user;
  const user = await UserModel.findById(userId).select("-password");
  res.status(200).json({
    user,
  });
});

// @Image Uploader function
const uploadImage = async image => {
  return imageUpload.uploader.upload(image, {
    upload_preset: "find-me-a-place",
  });
};

//@desc   Update Logged in Users profile
//@route  PUT /api/user/updateprofile
//@access Private
export const updateMyProfile = asyncHandler(async (req, res, next) => {
  const { user: userId } = req.user;
  const user = await UserModel.findById(userId);

  let upload;

  if (req.body.profile_photo) {
    if (user.photo) {
      await imageUpload.uploader.destroy(user.photo);
    }
    upload = await uploadImage(req.body.profile_photo);

    user.photo = upload.public_id;
  }

  if (!user) {
    next(new ErrorResponse("Kindly login to update", 403));
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  let userObj = {
    email: updatedUser.email,
    name: updatedUser.name,
    _id: updatedUser._id,
  };

  upload ? (userObj.photo = user.photo) : userObj;

  res.status(200).json({
    user: { ...userObj },
  });
});

//@desc   Forgot Password
//@route  POST /api/user/forgotpassword
//@access Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorResponse("Please enter email to continue...", 400));
  }
  const user = await UserModel.findOne({ email: req.body.email }).select(
    "-password"
  );
  if (!user) {
    return next(
      new ErrorResponse(`User with email ${req.body.email} doesnt exist`, 404)
    );
  }
  // Reset Token
  const resetToken = user.getResetPasswordToken();

  try {
    await sendMail({
      to: req.body.email,
      subject: "Reset Password Request | FindMeAPlace",
      message: `If you initiated the reset password request please visit the following link ${process.env.RESET_PASSWORD_URL}/${resetToken}`,
    });

    await user.save({ validateBeforeSave: false });
    return res.json({
      message: `Mail sent to ${req.body.email}`,
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgetPasswordTimestamp = undefined;
    await user.save({ validateBeforeSave: false });
    next(new ErrorResponse("Coudnt sent email try again after sometime", 500));
  }
});

//@desc Reset Password
//@route PUT /api/user/resetpassword/:resettoken
//@access Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { resettoken } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  const user = await UserModel.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgetPasswordTimestamp: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  user.password = req.body.password;
  user.forgotPasswordToken = undefined;
  user.forgetPasswordTimestamp = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    message:
      "Your Password Has been successfully updated kindly login to continue ...",
  });
});

//@desc   Logout User
//@route  GET /api/user/logout
//@access Private
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", { maxAge: 1, httpOnly: true });

  res.json({
    user: null,
  });
});
