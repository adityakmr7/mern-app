const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      userName: userName,
    });
    const result = await user.save();
    res.status(200).json({
      message: "User Created",
      userId: result._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User doesn't Exists");
      error.statusCode = 404;
      throw error;
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      const error = new Error("Wrong User Name or Password ");
      error.statusCode = 404;
      throw error;
    }
    const token =jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userId: user._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};
