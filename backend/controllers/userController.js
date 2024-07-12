const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken.js'); // Adjust the path as necessary

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("Email already in use");
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
       
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      console.log("User not created");
      return res.status(400).json({ message: "User not created" });
    }

  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      success: true,
    });
  } else {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }
});

const allUsers = asyncHandler(async (req, res) => {
const keyword = req.query.search ? {
  $or: [
    { name: { $regex: req.query.search, $options: "i" } },
    { email: { $regex: req.query.search, $options: "i" } },
  ],
} : {};
}

})



module.exports = { registerUser,loginUser,allUsers };
