import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log("Connected!"))
    .catch((err: any) => console.log(err));
}


export { connectToDb }
