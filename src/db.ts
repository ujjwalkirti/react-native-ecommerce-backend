import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
      //make the console log more descriptive
      console.log("Connected to MongoDB");
    })
    .catch((err: any) => console.log(err));
}


export { connectToDb }
