import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/userRoute.js";
import errorHandler, { notFound } from "./middlewares/errorHandler.js";

dotenv.config({});

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Setting up routes
app.use("/api/user", userRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on PORT ${PORT}`);
});
