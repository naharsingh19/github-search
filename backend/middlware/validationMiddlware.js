// Example validation middleware for validating request parameters
exports.validateSearchParams = (req, res, next) => {
  const { username, location } = req.query;

  if (!username && !location) {
    return res
      .status(400)
      .json({ error: "At least one search parameter is required" });
  }

  next(); // Move to the next middleware or route handler
};

// Example validation middleware for validating request body
exports.validateUserSave = (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  next(); // Move to the next middleware or route handler
};

// Implement other validation middleware functions as needed
