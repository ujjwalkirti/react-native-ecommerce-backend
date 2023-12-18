import { Router } from "express";
import cartController from "../controllers/cartController";

const cartRouter = Router();

cartRouter.get("/find/:id", cartController.getCart);

cartRouter.post("/", cartController.addToCart)

cartRouter.post("/:quantity", cartController.decrementCardItem)

cartRouter.delete("/:cartItemId", cartController.deleteCartItem)


export default cartRouter;
