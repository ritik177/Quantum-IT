const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const signup = async (req, res) => {
  try {
    console.log("i am here ");
    const { name, dob, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      dob,
      email,
      password: hashedPassword,
    });
    console.log("at save",user);
    const user1 = await user.save();
    console.log("user", user1);

    // const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // res.status(200).json({ success: true, message: "User registered successfully", token });
    res.status(200).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(200).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ success: true, message: "Login successful", token ,user});
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
};

