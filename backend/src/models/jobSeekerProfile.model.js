import mongoose, { Schema } from "mongoose";
import { socialProfilesSchema } from "./socialProfiles.schema.js";

const certificationSchema = new Schema({
  name: String,
  issuingOrganization: String,
  dateObtained: Date,
  link: String,
});
const languageSchema = new Schema({
  language: String,
  proficiency: String,
});
const educationSchema = new Schema({
  institution: String,
  degree: String,
  fieldOfStudy: String,
  startYear: Number,
  endYear: Number,
});
const workExperienceSchema = new Schema({
  jobTitle: String,
  company: {
    name: String,
    logoUrl: {
      type: String,
      default:
        "https://photos.wellfound.com/startups/i/267839-22e9550a168c9834c67a3e55e2577688-medium_jpg.jpg?buster=1677467708",
    },
    domain: String,
  },
  startMonth: Date,
  endMonth: Date,
  currentJob: Boolean,
  description: String,
});

const projectExperienceSchema = new Schema({
  projectName: String,
  description: String,
  role: String,
});

const jobPreferencesSchema = new Schema({
  types: [String],
  industries: [String],
  locations: [String],
});
const jobSeekerProfileSchema = new Schema({
  contactNumber: String,
  doneOnboarding: { type: Boolean, default: false },
  address: {
    city: String,
    state: String,
    country: String,
  },
  dateOfBirth: Date,
  gender: String,
  nationality: String,
  savedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  profilePicture: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
  },
  resume: String,
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
  applications: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  socialProfiles: socialProfilesSchema,
  publicProfile: Boolean,
  jobPreferences: jobPreferencesSchema,
  yearsOfExperience: String,
  primaryRole: String,
  aiUseLimit: { type: Number, default: 1 },
});

export const JobSeekerProfile = mongoose.model(
  "JobSeekerProfile",
  jobSeekerProfileSchema
);
