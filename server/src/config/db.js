import mongoose from "mongoose";
import { config } from "./env.js";

let isConnected = false;
async function connect() {
    if (isConnected) return;
    const options = {
        tls: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5_000,
        socketTimeoutMS: 45_000,
        // autoIndex: true,
    };
    try {
        await mongoose.connect(config.MONGODB_URI, options);
        isConnected = true;
        console.log(`✅  Mongoose connected → ${mongoose.connection.name}`);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
async function disconnect() {
    if (!isConnected) return;
    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log("Mongoose disconnected successfully!");
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
export { connect, disconnect };
