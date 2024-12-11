import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./db/connection.js";
import { ApiResponse } from "./utils/apiResponse.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
const app = express();
const port = process.env.PORT || 5000;
config({ path: "./.env" });

app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log('error', err.message)
    res.status(statusCode).json(new ApiResponse(statusCode, null, err.message));
});
dbConnect().then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)));  