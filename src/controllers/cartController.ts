import { Request, Response } from "express";
import cartModel from "../models/Cart";

export default {
	addToCart: async (req: Request, res: Response) => {
		const { userId, cartItem, quantity } = req.body;

		try {
			const cart = await cartModel.findOne({ userId });
			if (cart) {
				const existingProduct = cart.products.find(
					(product: any) => product.cartItem.toString() === cartItem
				);
				if (existingProduct) {
					existingProduct.quantity += quantity;
				} else {
					cart.products.push({ cartItem, quantity });
				}
				await cart.save();
				res.status(200).json({ message: "Product added to cart.", cart });
			} else {
				const newCart = new cartModel({
					userId,
					products: [{ cartItem, quantity }],
				});
				await newCart.save();
				res.status(200).json("Product added to cart.");
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	},
	getCart: async (req: Request, res: Response) => {
		const userId = req.params.id;
		try {
			const cart = await cartModel
				.findOne({ userId })
				.populate("products.cartItem", "_id title supplier price imageUrl");
			res.status(200).json(cart);
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Something went wrong", error: error.message });
		}
	},
	deleteCartItem: async (req: Request, res: Response) => {
		const { cartItemId } = req.params;

		try {
			const updatedCart = await cartModel.findOneAndUpdate(
				{ "products._id": cartItemId },
				{ $pull: { products: { _id: cartItemId } } },
				{ new: true }
			)
			if (!updatedCart) {
				return res.status(404).json({ message: "Cart item not found." })
			}

			res.status(200).json({ message: "Cart item deleted.", updatedCart });
		}
		catch (error: any) {
			res.status(500).json({ message: "Something went wrong", error: error.message })
		}
	}
	,
	decrementCardItem: async (req: Request, res: Response) => {
		const { userId, cartItem } = req.body;
		try {
			const cart = await cartModel.findOne({ userId });
			if (!cart) {
				return res.status(404).json({ message: "Cart not found." })
			}

			const existingProduct = cart.products.find(
				(product: any) => product.cartItem.toString() === cartItem
			);
			if (!existingProduct) {
				return res.status(404).json({ message: "Product not found in cart." })
			}
			if (existingProduct.quantity === 1) {
				await cartModel.updateOne(
					{ userId },
					{ $pull: { products: { cartItem } } }
				)
			} else {
				existingProduct.quantity -= 1;
			}
			await cart.save();
			if (existingProduct.quantity === 0) {
				await cartModel.updateOne(
					{ userId },
					{ $pull: { products: { cartItem } } }
				)
			}

		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	},
};
