const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// Async function
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // parser settings
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connection established successfully!");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
