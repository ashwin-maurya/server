import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, required: true },
  avatar: String,
  gender: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("User", userSchema);

export default User;
