const errorHandler = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error",
  };

  if (err.name === "CastError") {
    error.statusCode = 404 ; 
    error.message = `No item found with id : ${err.value}`
  }

  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = `this ${Object.keys(
      err.keyValue
    )} is already exist ! please choose another value`;
  }

  res.status(error.statusCode).json({ message: error.message });
};

module.exports = errorHandler;
