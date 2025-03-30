import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import Product from "./models/product.model.js";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/products", async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields!",
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
