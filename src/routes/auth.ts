import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", authController.createUser);
authRouter.post("/login", authController.loginUser);

export default authRouter;
