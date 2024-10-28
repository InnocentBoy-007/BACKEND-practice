import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const MONGOURL = process.env.MONGOURL;

export const connectDatabase = async()=> {
    try {
        await mongoose.connect(MONGOURL+"/crud");
        console.log("Database connected successfully!");
    } catch (error) {
        console.log(`Error connecting database: ${error}`);
    }
}
