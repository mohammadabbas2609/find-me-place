import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(({ properties }) => {
      return properties.message;
    });

    error = new ErrorResponse(message, 400);
  }

  //  Mongoose Bad Object Id
  if (err.name === "CastError") {
    const message = `Resource with id ${err.value} doesnt exists`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplicate Value
  if (err.code === 11000) {
    let duplicateValue = Object.values(err.keyValue)[0];
    const message = `${duplicateValue} already exists`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

export const notFound = (req, res, next) => {
  next(new ErrorResponse("Incorrect Route", 404));
};

export default errorHandler;
