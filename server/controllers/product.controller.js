import Cart from "../models/cart.models.js";
import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json(new ApiResponse(200, products, "success"));
});


export const addProduct = asyncHandler(async (req, res, next) => {
  const { name, image, price, stock } = req.body;

  // Validate required fields
  if (!name || !price || !stock || !image) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Name, price, and stock are required"));
  }

  // Check if the product already exists
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Product already exists"));
  }

  // Create a new product
  const newProduct = new Product({
    name,
    image: image || null, // Optional image field
    price,
    stock,
  });

  // Save the product to the database
  await newProduct.save();

  // Send a success response
  res.status(201).json(new ApiResponse(201, newProduct, "Product added successfully"));
});

export const addProductToCart = asyncHandler(async (req, res, next) => {
  const product = await Cart.findOne({ productID: req.params.id });

  if (product) {
    const updated = await Cart.findOneAndUpdate(
      { productID: req.params.id },
      { $inc: { count: 1 } },
      {
        new: true,
      }
    );
    res.status(200).json(new ApiResponse(200, updated, "success"));
  } else {
    const newItem = new Cart({ productID: req.params.id, count: 1 });
    await newItem.save();
    res.status(200).json(new ApiResponse(200, newItem, "success"));
  }
});

export const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const product = await Cart.findOne({ productID: req.params.id });
  if (product) {
    await Cart.deleteOne({ productID: req.params.id });
  }
  res.status(200).json(new ApiResponse(200, product, "success"));
});

export const removeOnevalueFromCart = asyncHandler(async (req, res, next) => {
  const product = await Cart.findOne({ productID: req.params.id });
  if (product) {
    const updated = await Cart.findOneAndUpdate(
      { productID: req.params.id },
      { $inc: { count: -1 } },
      {
        new: true,
      }
    );
    res.status(200).json(new ApiResponse(200, updated, "success"));
  }
});
