import mongoose from "mongoose";
import geocoder from "../utils/geocoder.js";

const HouseDescription = {
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  detailedDesc: {
    hall: {
      type: Number,
      required: [true, "Please enter no's of hall"],
    },
    swimminPool: {
      type: Boolean,
      default: false,
    },
    bedroom: {
      type: Number,
      required: [true, "Please enter no's of bedroom"],
    },
  },
};

const HouseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    photo: {
      type: String,
    },
    description: {
      type: HouseDescription,
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
      unique: true,
    },
    location: {
      type: String,
      enum: ["Point"],
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    IsSold: {
      type: Boolean,
      default: false,
    },
    onRent: {
      type: Boolean,
      required: [true, "Please provide wheater its for rent"],
    },
    onSale: {
      type: Boolean,
      required: [true, "Please provide wheater its for sale"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price of house"],
    },
    negotiable: {
      type: Boolean,
      required: [true, "Please provide wheather price is negotiable"],
    },
  },
  { timestamps: true }
);

HouseSchema.save("pre", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    state: loc[0].stateCode,
    country: loc[0].countryCode,
  };

  // Not saving address in database
  this.address = undefined;
  next();
});

const HouseModel = new mongoose.model("house", HouseSchema);

export default HouseModel;
