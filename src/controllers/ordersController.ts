import { Request, Response } from "express";
import orderModel from "../models/Order";


export default {
    getUserorders: async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const userOrders = await orderModel.find({ userId }).populate({
                path: 'productId',
                select: '-description -product_location'
            }).exec();
            res.status(200).json(userOrders);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
