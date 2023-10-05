const express = require("express");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { SECRET, MAX_AGE } = require("../../consts");
const { requireLogin } = require("../../middleware/auth");

const router = express.Router();

const createJwt = (payload) => {
  return jwt.sign({ payload }, SECRET, { expiresIn: MAX_AGE });
};

/**
 * @route POST api/users/register
 * @desc Register new user
 * @access Private
 */
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  User.create({ username, email, password })
    .then(() => {
      return res.status(200).json({ message: "success" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ message: "failed", error });
    });
});

/**
 * @route POST api/login
 * @desc Login user
 * @access Public
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "failed", error: "wrong-credentials" });
      }
      const maxAge = 3 * 24 * 60 * 60;
      const token = createJwt(user._id, maxAge);
      res.cookie("auth", token, { httpOnly: true, maxAge: maxAge * 10 });
      return res.status(200).json({ message: "success", data: user });
    })
    .catch((err) => {
      return res.status(400).json({ message: "failed", err });
    });
});

/**
 * @route POST api/logout
 * @desc Log user out
 * @access Public
 */
router.post("/logout", (req, res) => {
  res.clearCookie("auth");
  return res.status(200).json({ message: "success" });
});

/**
 * @route GET api
 * @desc Get authenticated user
 * @access Private
 */
router.get("/", requireLogin, (req, res) => {
  const token = req.cookies.auth;
  const _id = jwt.verify(token, SECRET).payload;
  User.findOne({ _id }, { username: 1, email: 1, registrationDate: 1 })
    .then((user) => {
      return res.status(200).json({ message: "success", data: user });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(401)
        .json({ message: "error", code: "unauthenticated-access" });
    });
});

module.exports = router;
