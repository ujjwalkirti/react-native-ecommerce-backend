import { Request, Response } from "express";

const Product = require("../models/Products");

module.exports = {
  createProduct: async (req: Request, res: Response) => {
    const newProduct = new Product(req.body);
    try {
      const createdProduct = await newProduct.save();
      res
        .status(200)
        .json({ message: "Product created successfully!", createdProduct });
    } catch (err) {
      res.status(500).json({ message: "Failed to create the product!" });
    }
  },
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res
        .status(200)
        .json({ message: "Products fetched successfully!", products });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch the products!" });
    }
  },
  getProductById: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      res
        .status(200)
        .json({ message: "Product fetched successfully!", product });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch the product!" });
    }
  },
  updateProductById: async (req: Request, res: Response) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Product updated successfully!", updatedProduct });
    } catch (err) {
      res.status(500).json({ message: "Failed to update the product!" });
    }
  },
  searchProduct: async (req: Request, res: Response) => {
    try {
      const result = await Product.aggregate([
        [
          {
            $search: {
              index: "furniture",
              text: {
                query: req.params.key,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ],
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to search the product!" });
    }
  },
};
