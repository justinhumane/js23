require("dotenv").config();
const express = require("express");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const MAX_AGE = process.env.MAX_AGE;
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
  const { firstName, lastName, email, password } = req.body;
  User.create({ firstName, lastName, email, password })
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
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "failed", error: "No user found" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "failed", error: "Invalid password" });
    }

    const maxAge = 3 * 24 * 60 * 60;
    const token = createJwt(user._id, maxAge);
    res.cookie("auth", token, { httpOnly: true, maxAge: maxAge * 10 });
    return res.status(200).json({ message: "success", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed", error: "Internal Server Error" });
  }
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
  User.findOne(
    { _id },
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      registrationDate: 1,
      level: 1,
    }
  )
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

router.put("/edit/:id", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
    });
    if (!user) throw new Error("Something went wrong updating the user!");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/edit/:id/password", async (req, res) => {
  const { oldPassword, newPassword, confirmationPassword } = req.body;
  try {
    const user = await User.findById(req.params.id);

    user.validatePassword(oldPassword, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "failed", error: "wrong-credentials" });
      }
    });

    if (newPassword !== confirmationPassword) {
      return res.status(401).json({
        message: "failed",
        error: "New password and confirmation password isn't the same",
      });
    }

    user.password = newPassword;
    await user.save();

    if (!user) throw new Error("Something went wrong updating the user!");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/unapproved", async (req, res) => {
  try {
    const users = await User.find({ level: { $gt: 2 } });

    if (!users) throw new Error("No users found");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/approve/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, { level: 2 });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
