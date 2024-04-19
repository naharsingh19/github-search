const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const logger = require("./logger"); // Import the logger module
require("dotenv").config();
const PORT = process.env.PORT;

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    logger.info("Connected to MongoDB"); // Log successful MongoDB connection
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`); // Log MongoDB connection error
  }
};

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware to log incoming requests
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/users", userRoutes);

// Middleware to log server errors
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(PORT, () => {
  connectToMongoDB();
  logger.info(`Server is running on http://localhost:${PORT}`);
});
