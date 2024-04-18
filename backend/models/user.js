const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  location: String,
  bio: String,
  blog: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
