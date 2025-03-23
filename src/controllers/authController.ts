import User from "../models/User";

import CryptoJS from "crypto-js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import Token from "../models/Token";
import { access } from "fs";

dotenv.config();

export default {
  createUser: async (req: Request, res: Response) => {
    // check whether email, password and username is provided
    const requiredFields = ["email", "password", "username"];
    let missingFields = [];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC as string
        ).toString(),
        location: req.body.location,
      });
      await newUser.save();

      //create token and save it
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SEC as string,
        { expiresIn: "7d" }
      )

      const newToken = new Token({
        email: req.body.email,
        token: token,
      });
      await newToken.save();
      res.status(201).json({ message: "User created successfully!", data: { accessToken: token } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
  loginUser: async (req: Request, res: Response) => {
    // check whether email and password is provided
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email and password required!" });
    }
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

      const { _id, password, createdAt, updatedAt, ...others } = user.toObject();

      //check whether user has already logged in
      const token = await Token.findOne({ email: req.body.email });
      if (token) {
        return res.status(200).json({ message: "User logged in successfully!", data: { ...others, accessToken: token.token } });
      }
      else {
        const accessToken = jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_SEC as string,
          { expiresIn: "7d" }
        );

        // store the token
        await Token.create({ email: req.body.email, token: accessToken });

        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
