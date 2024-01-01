import mongoose from "mongoose";
import { socialProfilesSchema } from './social-profiles.schema.js';
const employerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: String,
    address: String,
    industry: String,
    companySize: Number,
    companyLogo: {
        data: Buffer,
        contentType: String
    },
    companyName: { type: String, required: true },
    companyLocation: String,
    companyWebsite: String,
    companyDescription: String,
    jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    companySocialProfiles: socialProfilesSchema,
    teamMembers: [{
        name: String,
        role: String
    }],
    employeeBenefits: [String]
});
