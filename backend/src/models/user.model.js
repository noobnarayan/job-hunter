import mongoose, { Schema } from "mongoose";
import { JobSeekerProfile } from './jobSeekerProfile.model.js';
import { CompanyProfile } from './companyProfile.model.js';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    userProfile: { type: Schema.Types.Mixed }
});

userSchema.pre('save', function (next) {
    if (this.role === 'jobSeeker') {
        this.userProfile = new JobSeekerProfile(this.userProfile);
    } else if (this.role === 'employer') {
        this.userProfile = new CompanyProfile(this.userProfile);
    }
    next();
});

export const User = mongoose.model("User", userSchema);
