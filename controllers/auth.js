const Users = require("../models/user");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await Users.create({ username, email, password });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }
    const user = await Users.findOne({ email });
    if (!user) {
      throw new NotFoundError("please provide a valid email or password");
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new NotFoundError("please provide a valid email or password");
    }

    const token = await jwt.sign(
      { _id: user._id, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.json({ message: "login was successful", token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
