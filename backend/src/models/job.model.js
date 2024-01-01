const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
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
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'EmployerProfile', required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobSeeker' }],
    shortlistedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobSeeker' }],
    companyLogo: {
        data: Buffer,
        contentType: String
    },
    benefits: [String],
    applicationDeadline: Date,
    remoteWork: Boolean,
    travelRequirements: String,
    additionalRequirements: [String],
});
