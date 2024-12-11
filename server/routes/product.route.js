import { Router } from "express";
import {
  addProduct,
  addProductToCart,
  getProducts,
  removeOnevalueFromCart,
  removeProductFromCart,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/getProducts", getProducts);
router.post("/addtocart/:id", addProductToCart);
router.put("/removeOneFromCart/:id", removeOnevalueFromCart);
router.post("/addProduct", addProduct);

export default router;
