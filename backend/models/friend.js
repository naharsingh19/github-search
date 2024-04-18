const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  userA: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userB: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;
