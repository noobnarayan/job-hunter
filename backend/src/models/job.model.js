import mongoose, { Schema } from "mongoose";
import { User } from './user.model.js';

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: [String],
    requirements: [String],
    skills: [String],
    education: String,
    experience: String,
    salaryRange: {
        from: Number,
        to: Number
    },
    type: String,
    location: String,
    datePosted: { type: Date, default: Date.now },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    shortlistedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    companyLogo: String,
    benefits: [String],
    applicationDeadline: Date,
    remoteWork: Boolean,
    travelRequirements: String,
    additionalRequirements: [String],
});

export const Job = mongoose.model("Job", jobSchema);