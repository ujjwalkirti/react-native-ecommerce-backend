import User from "../models/User";

import CryptoJS from "crypto-js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export default {
  createUser: async (req: Request, res: Response) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC as string
      ).toString(),
      location: req.body.location,
    });

    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Wrong credentials!");
      }

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC as string
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong credentials!");
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SEC as string,
        { expiresIn: "7d" }
      );

      const { password, createdAt, updatedAt, ...others } =
        user.toObject();

      res.status(200).json({ ...others, accessToken });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
