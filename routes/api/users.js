const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// const normalize = require("normalize-url");

// User model
const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Detructuring req.body for user details
    const { name, email, password } = req.body;

    try {
      // See if user already exists
      let user = await User.findOne({ email }); // Email same as email: email

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar (based on user's email)
      const avatar = gravatar.url(email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default image
      });

      // Create a new instance of User model
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); // Creating hash with salt

      // Saving new user
      await user.save();

      // Return JsonWebToken
      // Creating payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Creating token with payload
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          // Return token
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
