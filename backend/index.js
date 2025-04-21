const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Users_info", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Registration Route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required!" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists! Please log in." });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: "Registration Successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// User Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password are required!" });

  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid email or password!" });

    res.json({ message: "Login Successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001...");
});
