const { Schema, model, models } = require("mongoose");

//Creating Schema
const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    job_title: { type: String, required: true },
  },
  { timestamps: true }
);

//Creating model
const User = models?.User || model("User", userSchema);

module.exports = User;
