import { Router } from "express";
import { checkout, getCartItems } from "../controllers/cart.controller.js";

const router = Router();

router.get("/getPCartItems", getCartItems);
router.post("/checkout", checkout);
export default router;
