import mongoose from "mongoose";

const taskTable = new mongoose.Schema({
  taskOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  taskTitle: { type: String },
  status: { type: Boolean, default: false },
});

export default mongoose.model("Task", taskTable);
