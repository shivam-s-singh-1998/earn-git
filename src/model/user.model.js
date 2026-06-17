import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    city: String,
    profession: String
  });
  export const User = mongoose.model("User", userSchema);