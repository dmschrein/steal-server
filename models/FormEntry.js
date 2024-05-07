import mongoose from "mongoose";

const { Schema } = mongoose;

const FormEntrySchema = new Schema({
  businessName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, },
  website: { type: String, },
  industry: { type: [String], },
  prodCategories: { type: [String], },
  keyProducts: { type: String, },
  platformsUsed: { type: [String], },
  avgMonthlySales: { type: [String],  },
  competitiveEdge: { type: [String], },
  challengesFaced: { type: [String],},
  interest: { type: [String], },
  expectedBenefits: { type: [String], },
  additionalInfo: { type: String,},
});

export default mongoose.model("FormEntry", FormEntrySchema);
