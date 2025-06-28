const express = require("express");
const bcrypt = require("bcryptjs");
const { getDB } = require("../db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySecretKey123";

const router = express.Router();

// ✅ Register route
router.post("/register", async (req, res) => {
  const db = getDB();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered", userId: result.insertedId });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// ✅ Login route (already present)
router.post("/login", async (req, res) => {
  const db = getDB();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        {userId: user._id, username: user.username},
        SECRET_KEY,
        {expiresIn: "1h"}
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
