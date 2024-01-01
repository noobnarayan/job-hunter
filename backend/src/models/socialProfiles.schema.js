import mongoose, { Schema } from "mongoose";
const socialProfilesSchema = new Schema({
    linkedIn: String,
    github: String,
    twitter: String
});
export { socialProfilesSchema };
