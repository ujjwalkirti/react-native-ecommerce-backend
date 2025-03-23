import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();


//use localhost if not in production
const connectionString = process.env.NODE_ENV !== "production" ? "mongodb://localhost:27017/react-native-ecommerce-backend" : process.env.MONGODB_URI as string;
function connectToDb() {
  mongoose
    .connect(connectionString)
    .then(() => {
      //make the console log more descriptive
      console.log("Connected to MongoDB");
    })
    .catch((err: any) => console.log(err));
}


export { connectToDb }
