const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const adminMiddleware = require('../middleware/admin');

// User Registration
//router.post('/signup', async (req, res) => {
//  const { name, email, password } = req.body;
//
//  try {
//    if (!name || !email || !password) {
//      return res.status(400).json({ error: 'All fields are required' });
//    }

    // Check if email already exists
//    const existingUser = await User.findOne({ email });
//    if (existingUser) {
//      return res.status(400).json({ error: 'Email already in use' });
//    }

    // Hash password
//    const hashedPassword = await bcrypt.hash(password, 10);
//    console.log('Generated Hash on Signup:', hashedPassword);

    // Save user
//    const newUser = new User({ name, email, password: hashedPassword });
//    await newUser.save();

    // Generate JWT token
//    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//
//    res.status(201).json({ message: 'User registered successfully!', token });
//  } catch (error) {
//    console.error('Error during registration:', error);
//    res.status(500).json({ error: 'Server error' });
//  }
//});

// User Registration
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Save the user (password will be hashed by the pre('save') middleware)
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
