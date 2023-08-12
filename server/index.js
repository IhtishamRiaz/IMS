import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./database/db.js";

dotenv.config();
const app = express();

Connection();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT, () => console.log(`Server Running at http://localhost:${process.env.PORT}`));
