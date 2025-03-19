import { Router } from "express";
import ordersController from "../controllers/ordersController";

const orderRouter = Router();


orderRouter.get("/:userId", ordersController.getUserorders)


export default orderRouter;
