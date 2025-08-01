    const express = require('express');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const User = require('../models/User');

    const router = express.Router();

    // Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["client", "freelancer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.json({ message: "Registration successful" });
  } catch (e) {
    res.status(500).json({ message: "Registration failed", error: e.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { _id:user._id ,name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ message: "Login failed", error: e.message });
  }
});

module.exports = router;

    // Middleware Example
    router.get('/protected', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });
    try {
        const token = auth.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Protected route', payload });
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
    });

    module.exports = router;