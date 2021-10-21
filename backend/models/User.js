import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const { isEmail } = validator;

const UserSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: [isEmail, "Please provide valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [5, "Please provide password more than 5 characters"],
    },
    forgetPasswordToken: {
      type: String,
    },
    forgetPasswordTimestamp: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.directModifiedPaths().includes("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (userpass) {
  return await bcrypt.compare(userpass, this.password);
};

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  // Hash token and set to forgetPassword Token field
  this.forgetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Set Expiry
  this.forgetPasswordTimestamp = Date.now() + 10 * 60 * 1000;

  return token;
};

const UserModel = new mongoose.model("user", UserSchema);

export default UserModel;
