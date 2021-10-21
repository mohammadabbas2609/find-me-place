import nodeGeocoder from "node-geocoder";
import dotenv from "dotenv";

dotenv.config({});

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  httpAdapter: "https",
  formatter: null,
};

const geocoder = nodeGeocoder(options);

export default geocoder;
