import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("TestResult", testResultSchema);
