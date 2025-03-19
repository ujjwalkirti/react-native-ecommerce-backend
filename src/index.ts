import express, { Express, Request, Response } from "express";
import { configDotenv } from "dotenv";
import { connectToDb } from "./db";
import apiRouter from "./routes/index";
import verifyToken from "./middleware/jwt";

configDotenv();

const app: Express = express();
const port = process.env.PORT || 3000;

// connect to mongodb
connectToDb();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api", verifyToken, apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
