import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: [String],
    requirements: [String],
    skills: [String],
    education: String,
    experience: String,
    salaryRange: {
      from: Number,
      to: Number,
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
      default: "Full-time",
    },
    workMode: {
      type: String,
      enum: ["Onsite", "Hybrid", "Remote"],
      default: "Onsite",
    },

    location: String,
    datePosted: { type: Date, default: Date.now },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shortlistedCandidates: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    benefits: [String],
    applicationDeadline: Date,

    travelRequirements: String,
    additionalRequirements: [String],
    urgent: Boolean,
    numberOfOpenings: Number,
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("Job", jobSchema);
