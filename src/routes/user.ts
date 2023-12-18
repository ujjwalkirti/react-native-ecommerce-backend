import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.delete("/:id", userController.deleteUser);
userRouter.get("/:id", userController.getUser);


export default userRouter;
