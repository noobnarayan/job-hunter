import mongoose, { Schema } from "mongoose";
import { socialProfilesSchema } from "./socialProfiles.schema.js";

const companyProfileSchema = new Schema({
  companyName: { type: String, required: true },
  doneOnboarding: { type: Boolean, default: false },
  companyDescription: String,
  contactNumber: String,
  address: {
    city: String,
    state: String,
    country: String,
  },
  industry: String,
  companySize: {
    from: Number,
    to: Number,
  },
  companyLogo: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
  },
  companyWebsite: String,
  jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  companySocialProfiles: socialProfilesSchema,
  employeeBenefits: [String],
  aiUseLimit: { type: Number, default: 1 },
});

export const CompanyProfile = mongoose.model(
  "CompanyProfile",
  companyProfileSchema
);
