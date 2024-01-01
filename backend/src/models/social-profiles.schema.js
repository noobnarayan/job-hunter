const mongoose = require('mongoose');
const socialProfilesSchema = new mongoose.Schema({
    linkedIn: String,
    github: String,
    twitter: String
});
export { socialProfilesSchema };
