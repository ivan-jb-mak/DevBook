const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Database configuration
const uri = require("./config/keys").mongoURI;

//creating express server on port 5000
const app = express();
const port = process.env.PORT || 5000;

// middleware with cors
app.use(cors());
app.use(express.json()); //to parse json

// parser settings
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// mongoose connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.get("/", (req, res) => res.send("Hello Dabi"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
