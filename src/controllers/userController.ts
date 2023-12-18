import { Request, Response } from "express";
import User from "../models/User";

export default {
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, createdAt, updatedAt, ...others } = user.toObject();
      res.status(200).json({ others });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
