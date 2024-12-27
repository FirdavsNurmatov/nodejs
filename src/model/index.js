import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  user_id: { type: String, unique: true },
  first_name: String,
  last_name: String,
  username: String,
  key: String,
  value: String,
});

export const User = mongoose.model("User", userSchema);
