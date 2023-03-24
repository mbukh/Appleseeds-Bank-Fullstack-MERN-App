import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";

import accounts from "./routes/accountsRoutes.js";
import users from "./routes/usersRoutes.js";

import errorHandler from "./middleware/errorHandler.js";

import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// CORS cross-domain access
app.use(cors());
// Body parser middleware
app.use(express.json());

app.use("/api/v1/accounts", accounts);
app.use("/api/v1/users", users);

app.use("/", express.static("client/dist"));

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightYellow
            .underline
    )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
