const winston = require("winston");
const Error = require("../utils/Error");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Loginig error for dev
  if (err.name === "CastError") {
    const message = `not found with given id ${err.value}`;
    error = new Error(message, 404);
  }
  // Validation Error message
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new Error(message, 400);
  }

  winston.error(error.message);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    statusCode: error.statusCode || 500,
  });
};
