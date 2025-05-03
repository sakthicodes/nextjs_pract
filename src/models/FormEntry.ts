import mongoose from "mongoose";

const FormEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  message: String
}, { timestamps: true });

export default mongoose.models.FormEntry || mongoose.model("FormEntry", FormEntrySchema);
