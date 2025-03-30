import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productsRouter from "./routes/products.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
