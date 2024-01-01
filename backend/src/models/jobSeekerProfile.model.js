import mongoose, { Schema } from "mongoose";
import { socialProfilesSchema } from './socialProfiles.schema.js';

const certificationSchema = new Schema({
    name: String,
    issuingOrganization: String,
    dateObtained: Date,
    link: String
});
const languageSchema = new Schema({
    language: String,
    proficiency: String
});
const educationSchema = new Schema({
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startYear: Number,
    endYear: Number
});
const workExperienceSchema = new Schema({
    jobTitle: String,
    company: String,
    location: String,
    startMonth: String,
    startYear: Number,
    endMonth: String,
    endYear: Number,
    currentJob: Boolean,
    description: String
});
const projectExperienceSchema = new Schema({
    projectName: String,
    description: String,
    role: String
});

const jobPreferencesSchema = new Schema({
    types: [String],
    industries: [String],
    locations: [String]
});
const jobSeekerProfileSchema = new Schema({
    contactNumber: String,
    address: {
        city: String,
        state: String,
        country: String
    },
    dateOfBirth: Date,
    gender: String,
    nationality: String,
    savedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    resume: String,
    profilePicture: String,
    portfolioWebsite: String,
    certifications: [certificationSchema],
    languages: [languageSchema],
    interests: [String],
    projectExperience: [projectExperienceSchema],
    name: { type: String, required: true },
    location: String,
    bio: String,
    skills: [String],
    education: [educationSchema],
    workExperience: [workExperienceSchema],
    applications: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    socialProfiles: socialProfilesSchema,
    publicProfile: Boolean,
    jobPreferences: jobPreferencesSchema
});

export const JobSeekerProfile = mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);