import mongoose, { Schema } from "mongoose";
import { JobSeekerProfile } from "./jobSeekerProfile.model.js";
import { CompanyProfile } from "./companyProfile.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    refreshToken: String,
    userProfile: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.role === "jobSeeker") {
    this.userProfile = new JobSeekerProfile(this.userProfile);
  } else if (this.role === "employer") {
    this.userProfile = new CompanyProfile(this.userProfile);
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
