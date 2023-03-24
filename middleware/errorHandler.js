import ErrorResponse from "../utils/ErrorResponse.js";

const errorHandler = (error, req, res, next) => {
    let err = { ...error };
    err.message = error.message;

    console.log(`Error name: ${error.name}`.red);
    console.log(`Error code: ${error.code}`.red);
    console.log(`Error stack: ${error.stack}`.red);

    // Mongoose bad ObjectId
    if (error.name === "CastError") {
        const message = `Resource not found with id ending ...${error.value.slice(
            -6
        )} was not found`;
        err = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (error.code === 11000) {
        const field_value = err.message.match(/\{(.*)\}/gi);
        const message = `Duplicate data ${field_value}`;
        err = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join("; ");
        err = new ErrorResponse(message, 400);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Server Error",
    });
};

export default errorHandler;
