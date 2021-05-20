const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for Profile
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
});

// User variable and using the name "users"
module.exports = Profile = mongoose.model("profile", ProfileSchema);
