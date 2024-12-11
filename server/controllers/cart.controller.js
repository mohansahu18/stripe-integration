import Cart from "../models/cart.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import User from "../models/user.model.js";
import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/order.models.js";


const stripe = new Stripe(process.env.STRIPE_SECRET);



export const getCartItems = asyncHandler(async (req, res, next) => {
  const products = await Cart.find({}).populate("productID");
  res.status(200).json(new ApiResponse(200, products, "success"));
});



export const checkout = asyncHandler(async (req, res, next) => {
  const customer = await stripe.customers.create({
    email: req.body.email,
  });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    stripeId: customer.id,
  });
  await newUser.save();
  const products = await Cart.find({}).populate("productID");

  let items = [];
  let total = 0;
  products.map((x) => {
    items.push(x.productID._id);
    total += x.productID.price * x.count;
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
    customer: customer.id,
  });

  const newOrder = new Order({
    orderdBy: req.body.email,
    items,
    TotalAmount: total,
  });
  await newOrder.save();
  console.log(newOrder);
  const line_items = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.productID.name,
        images: [product.productID.image],
      },
      unit_amount: product.productID.price * 100,
    },
    quantity: product.count,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: "http://localhost:5173/cancel",
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { paymentIntentId: paymentIntent.id, sessionId: session.id },
        "success"
      )
    );
});
