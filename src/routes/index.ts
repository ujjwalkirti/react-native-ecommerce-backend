// main api route

import { Router } from "express";
import productRouter from "./products";
import authRouter from "./auth";
import userRouter from "./user";
import cartRouter from "./cart";
import orderRouter from "./order";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);

export default router;