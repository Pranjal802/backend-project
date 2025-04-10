// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`\n mongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error.message);
//         process.exit(1); // Exit the process with failure
//     }
// }

// export default connectDB;
// const mongoose = require("mongoose");
import mongoose from "mongoose";
// import DB_NAME from "../constants.js";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI;
        // const dbName = process.env.DB_NAME;

        if (!dbUri || !DB_NAME) {
            throw new Error("Missing MONGODB_URI or DB_NAME in environment variables.");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n✅ MongoDB connected successfully! \n🔗 DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
