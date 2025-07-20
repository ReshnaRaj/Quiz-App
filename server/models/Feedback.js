import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  emoji: { type: String, required: true },
  comment:{type:String},
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
