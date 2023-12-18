// const mongoose = require("mongoose");

import mongoose from "mongoose";


const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        cartItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
