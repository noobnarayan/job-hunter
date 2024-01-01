const mongoose = require('mongoose');
import { socialProfilesSchema } from './social-profiles.schema.js';
const certificationSchema = new mongoose.Schema({
    name: String,
    issuingOrganization: String,
    dateObtained: Date
});
const languageSchema = new mongoose.Schema({
    language: String,
    proficiency: String
});
const educationSchema = new mongoose.Schema({
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startYear: Number,
    endYear: Number
});
const workExperienceSchema = new mongoose.Schema({
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
const projectExperienceSchema = new mongoose.Schema({
    projectName: String,
    description: String,
    role: String
});

const jobPreferencesSchema = new mongoose.Schema({
    types: [String],
    industries: [String],
    locations: [String]
});
const jobSeekerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: String,
    address: String,
    dateOfBirth: Date,
    gender: String,
    nationality: String,
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    resume: {
        data: Buffer,
        contentType: String
    },
    profilePicture: {
        data: Buffer,
        contentType: String
    },
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
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    socialProfiles: socialProfilesSchema,
    publicProfile: Boolean,
    jobPreferences: jobPreferencesSchema
});
