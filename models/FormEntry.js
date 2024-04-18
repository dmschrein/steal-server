import mongoose from "mongoose";

const { Schema } = mongoose;

const FormEntrySchema = new Schema({
  businessName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  industry: { type: String, required: true },
  prodCategories: { type: String, required: true },
  keyProducts: { type: String, required: true },
  platformsUsed: { type: String, required: true },
  avgMonthlySales: { type: String, required: true },
  competitiveEdge: { type: String, required: true },
  challengesFaced: { type: String, required: true },
  interest: { type: String, required: true },
  expectedBenefits: { type: String, required: true },
  additionalInfo: { type: String, required: true },
});

export default mongoose.model("FormEntry", FormEntrySchema);
