import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

const data = mongoose.model("users", dataSchema);

export default data;
