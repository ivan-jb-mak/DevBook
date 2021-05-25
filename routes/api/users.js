const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");
// const normalize = require("normalize-url");

// User model
const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  // Express-validation with error messages
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Handling response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Sending back error messages in 400 response
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

      await user.save(); // Saving new user
      // Return JsonWebToken

      res.send("User registered");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// // @route    POST api/users
// // @desc     Register user
// // @access   Public
// router.post(
//   "/",
//   check("name", "Name is required").notEmpty(),
//   check("email", "Please include a valid email").isEmail(),
//   check(
//     "password",
//     "Please enter a password with 6 or more characters"
//   ).isLength({ min: 6 }),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;

//     try {
//       let user = await User.findOne({ email });

//       if (user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "User already exists" }] });
//       }

//       const avatar = normalize(
//         gravatar.url(email, {
//           s: "200",
//           r: "pg",
//           d: "mm",
//         }),
//         { forceHttps: true }
//       );

//       user = new User({
//         name,
//         email,
//         avatar,
//         password,
//       });

//       const salt = await bcrypt.genSalt(10);

//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: "5 days" },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

module.exports = router;
