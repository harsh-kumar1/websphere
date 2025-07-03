const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("353541647580-nfcsijq1voe1g5a41m5o72t9o8g4ca2h.apps.googleusercontent.com");


// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Optional: Signup route for testing
router.post('/signup', async (req, res) => {
  const { name , email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name,email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "353541647580-nfcsijq1voe1g5a41m5o72t9o8g4ca2h.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Optional: Save user to DB
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, picture });
    }

    // Optionally generate your own JWT
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: { name, email, picture }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid Google token' });
  }
});


module.exports = router;
