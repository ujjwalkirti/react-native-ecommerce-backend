import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false  
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7*24*3600, // 7 days
    },
});

export default mongoose.model("Token", tokenSchema);