import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = "mongodb+srv://shivams:JhW1EOe6LbPIlgUo@autorizz.f4ektmj.mongodb.net/redis-test-data";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  city: String,
  profession: String
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

async function dumpUsers() {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected!");
    
    console.log("📄 Reading users.json...");
    const data = fs.readFileSync(path.join(__dirname, '..', '..', 'users.json'), 'utf8');
    const users = JSON.parse(data);
    
    console.log(`📊 Inserting ${users.length} users...`);
    await User.insertMany(users);
    
    console.log("✅ Successfully dumped all users to MongoDB!");
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
}

dumpUsers();