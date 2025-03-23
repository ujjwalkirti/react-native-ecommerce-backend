// main api route

import { Router } from "express";
import productRouter from "./products";
import authRouter from "./auth";
import userRouter from "./user";
import cartRouter from "./cart";
import orderRouter from "./order";
import verifyToken from "../middleware/jwt";

const router = Router();

router.use("/products", verifyToken, productRouter);
router.use("/auth", authRouter);
router.use("/user", verifyToken, userRouter);
router.use("/cart", verifyToken, cartRouter);
router.use("/orders", verifyToken, orderRouter);

export default router;