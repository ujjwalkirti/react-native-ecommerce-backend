const mongoose = require("mongoose");
require("dotenv").config();


function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URI?.toString())
    .then(() => console.log("Connected!"))
    .catch((err: any) => console.log(err));
}


export { connectToDb }
