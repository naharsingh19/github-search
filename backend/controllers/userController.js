const axios = require("axios");
const User = require("../models/user");
const Friend = require("../models/friend");
const mongoose = require("mongoose");
const { Types } = require("mongoose");


exports.saveUser = async (req, res) => {
    const { username } = req.params;

    try {
      // Check if user already exists in the database
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists in the database" });
      }

      // Call GitHub API to get user details
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const userData = response.data;

      // Save user details into the database
      const newUser = new User({
        username: userData.login,
        location: userData.location,
        bio: userData.bio,
        blog: userData.blog,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
      });
      await newUser.save();

      res.json({ message: "User details saved successfully" });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        return res.status(404).json({ message: "User not found on GitHub" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
};



exports.findMutualFriends = async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's friends
    const friends = await Friend.find({ userA: user._id }).populate("userB");
    const followingIds = [
      ...new Set(friends.map((friend) => friend.userB._id)),
    ];
    const followersIds = [
      ...new Set(friends.map((friend) => friend.userA._id)),
    ];

    // Find users whom the given user follows
    const following = await User.find({ _id: { $in: followingIds } });

    // Find users who follow the given user
    const followers = await User.find({ _id: { $in: followersIds } });

    // Find mutual followers (users who follow the given user and are followed by the given user)
    const mutualFollowers = following.filter((followingUser) =>
      followers.some((follower) => follower._id.equals(followingUser._id))
    );

    // Log the users the current user is following
    console.log("Following:", following);

    // Log the users who follow the current user
    console.log("Followers:", followers);

    // Log the users who are mutual followers
    console.log("Mutual Followers:", mutualFollowers);

    let savedCount = 0; // Initialize counter for saved mutual followers

    for (const mutualFollower of mutualFollowers) {
      try {
        // Check if the friendship already exists
        const existingFriendship = await Friend.findOne({
          $or: [
            { userA: user._id, userB: mutualFollower._id },
            { userA: mutualFollower._id, userB: user._id },
          ],
        });

        if (!existingFriendship) {
          const newFriendship = new Friend({
            userA: user._id,
            userB: mutualFollower._id,
          });
          await newFriendship.save();
          savedCount++; // Increment counter for saved mutual followers
        }
      } catch (error) {
        console.error("Error saving friendship:", error);
        // Handle the error appropriately, such as returning an error response
        return res.status(500).json({ message: "Error saving friendship" });
      }
    }

    console.log(`${savedCount} mutual followers saved as friends`);

    return res
      .status(200)
      .json({ message: "Mutual followers saved as friends" });
  } catch (error) {
    console.error("Error finding mutual followers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.searchUsers = async (req, res) => {
  try {
    let { username, location } = req.query;

    // Check if query parameters are strings
    if (!username || typeof username !== "string") {
      username = "";
    }
    if (
      !location ||
      typeof location !== "string" ||
      location.toLowerCase() === "null"
    ) {
      location = ""; // Set location to empty string if it's not provided or equals "null"
    }

    console.log("Search criteria:", { username, location });

    // Construct query object
    const query = {};

    if (username.trim() !== "") {
      query.username = new RegExp(username, "i");
    }
    if (location.trim() !== "") {
      query.location = new RegExp(location, "i");
    }

    console.log("Database query:", query);

    const users = await User.find(query);

    console.log("Users found:", users);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    // Soft delete user record
    await User.updateOne({ username }, { $set: { deleted: true } });
    res.json({ message: "User record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { username } = req.params;
  const { location, bio, blog } = req.body;

  try {
    // Update user fields
    await User.updateOne({ username }, { $set: { location, bio, blog } });
    res.json({ message: "User fields updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsersSorted = async (req, res) => {
  const sortBy = req.query.sortBy || "created_at";

  try {
    // Return list of all users sorted by given field
    const users = await User.find({ deleted: false }).sort({ [sortBy]: 1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
