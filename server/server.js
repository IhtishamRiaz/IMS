import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDB from './config/dbConn.js'
import mongoose from "mongoose"
import { logger, logEvents } from "./middleware/logger.js"
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/errorHandler.js"
import corsOptions from './config/corsOptions.js'
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import addressRoutes from "./routes/addressRoutes.js"
import accountRoutes from './routes/accountRoutes.js'
import productRoutes from './routes/productRoutes.js'
import purchaseRoutes from './routes/purchaseRoutes.js'
import saleRoutes from './routes/saleRoutes.js'


dotenv.config();
const app = express();

ConnectDB()

app.use(logger)
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
// Auth Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
// Account Routes
app.use('/address', addressRoutes);
app.use('/account', accountRoutes);
// Product Routes
app.use('/product', productRoutes)
// Purchase Routes
app.use('/purchase', purchaseRoutes)
// Sale Routes
app.use('/sale', saleRoutes)




app.use(errorHandler);

mongoose.connection.once('open', () => {
   console.log('Connected to MongoDB');
   const PORT = process.env.PORT || 8080;
   app.listen(PORT, () => console.log(`Server Running on port ${process.env.PORT}`));
});

mongoose.connection.on('error', (error) => {
   console.log(error);
   logEvents(`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`, 'mongoErrLog.log');
});