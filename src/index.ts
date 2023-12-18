import express, { Express, Request, Response } from "express";
require("dotenv").config();
import { connectToDb } from "./db";
import productRouter from "./routes/products";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";

const app: Express = express();
const port = process.env.PORT || 3000;

// connect to mongodb
connectToDb();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/products", productRouter);
app.use("/api", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
