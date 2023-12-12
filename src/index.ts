import express, { Express, Request, Response } from "express";
require("dotenv").config();
import { connectToDb } from "./db";
const productRouter = require("./routes/products");

const app: Express = express();
const port = process.env.PORT || 3000;

// connect to mongodb
connectToDb();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/products", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
