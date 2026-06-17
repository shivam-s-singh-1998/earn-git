import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        await mongoose.connect("mongodb+srv://shivams:JhW1EOe6LbPIlgUo@autorizz.f4ektmj.mongodb.net/redis-test-data");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

export default connectDb;