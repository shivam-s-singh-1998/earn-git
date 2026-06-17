import { User } from "../model/user.model.js";
import redis from "../utils/redisClient.js";

export const getAllUsers = async (req, res) => {
    try {
        console.log("Getting all users");
        
        // Try to get from cache first
        const cacheKey = "all_users";
        const cachedData = await redis.get(cacheKey);
        
        if (cachedData) {
            console.log("📋 Returning cached users data");
            return res.json(JSON.parse(cachedData));
        }
        
        // Get from database
        const users = await User.find();
        
        // Cache the result for 5 minutes
        await redis.set(cacheKey, JSON.stringify(users), "EX", 300);
        
        console.log(`✅ Found ${users.length} users`);
        res.json(users);
        
    } catch (error) {
        console.error("❌ Error getting all users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const searchSpecificUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        
        if (!email) {
            return res.status(400).json({ error: "Email parameter is required" });
        }
        
        console.log(`🔍 Searching for user: ${email}`);
        
        // Create email-specific cache key
        const cacheKey = `user_email_${email}`;
        const cachedData = await redis.get(cacheKey);
        
        if (cachedData) {
            console.log("📋 Returning cached user data");
            return res.json(JSON.parse(cachedData));
        }
        
        // Search in database
        const users = await User.find({ email: email });
        
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Cache the result for 60 seconds
        await redis.set(cacheKey, JSON.stringify(users), "EX", 60);
        
        console.log(`✅ Found user: ${email}`);
        res.json(users);
        
    } catch (error) {
        console.error("❌ Error searching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const searchSpecificUserByName = async (req, res) => {
    try {
        const name = req.params.name;
        
        if (!name) {
            return res.status(400).json({ error: "name parameter is required" });
        }
        
        console.log(`🔍 Searching for user: ${name}`);
        
        // Create name-specific cache key
        const cacheKey = `user_name_${name}`;
        const cachedData = await redis.get(cacheKey);
        
        if (cachedData) {
            console.log("📋 Returning cached user data");
            return res.json(JSON.parse(cachedData));
        }
        
        // Search in database
        const users = await User.find({ name: name });
        
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Cache the result for 60 seconds
        await redis.set(cacheKey, JSON.stringify(users), "EX", 60);
        
        console.log(`✅ Found user: ${name}`);
        res.json(users);
        
    } catch (error) {
        console.error("❌ Error searching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createNewUser=async(req, res)=> {
    try {
        console.log("req.body", req.body);
       
        const {name,email,age,city ,profession}=req.body;
        if (!name || !email || !age || !city || !profession) {
            console.log("all fields are required");
            return res.status(400).json({ error: "all fields are required" }); 
        }
        console.log("name,email,age,city ,profession",name,email,age,city ,profession);

        const createUser= await User.create({name,email,age,city ,profession})
        res.json(createUser)
        
    } catch (error) {
        console.log("error while creating user",error);
        
    }
}