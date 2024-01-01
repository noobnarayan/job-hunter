import mongoose, { Schema } from "mongoose";
import { socialProfilesSchema } from './socialProfiles.schema.js';

const companyProfileSchema = new Schema({
    companyName: { type: String, required: true },
    companyDescription: String,
    contactNumber: String,
    address: {
        city: String,
        state: String,
        country: String
    },
    industry: String,
    companySize: {
        from: Number,
        to: Number
    },
    companyLogo: String,
    companyWebsite: String,
    jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    companySocialProfiles: socialProfilesSchema,
    employeeBenefits: [String]
});

export const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);
