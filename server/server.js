import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import corsOptions from './config/corsOptions.js';

dotenv.config();
const app = express();

Connection();

app.use(logger)
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Running on port ${process.env.PORT}`));
