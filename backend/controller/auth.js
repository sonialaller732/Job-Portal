const Signup = require("../model/signupmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const signup = await Signup.findOne({ email });
  if (!signup) return res.send("User Not Found");

  const match = await bcrypt.compare(password, signup.password);
  if (!match) return res.send("Wrong Password");

  const token = jwt.sign(
    { id: signup._id, type: signup.type },
    "SECRET123"
  );

  res.json({ token,userId: signup._id, });
};
