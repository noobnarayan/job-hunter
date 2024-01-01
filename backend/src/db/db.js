import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
const MONGODB_URL = process.env.MONGODB_URL
export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`)
        console.log(`MONGODB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MONGODB Connection error`, error);
        process.exit(1)
    }
}