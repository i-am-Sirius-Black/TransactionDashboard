import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();

const connectDB = async ()=>{
    const MONGO_URI = process.env.MONGO_URL;
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected');
           
    } catch (error) {
        console.log("failed to connect db", error);
    }
}

export default connectDB;