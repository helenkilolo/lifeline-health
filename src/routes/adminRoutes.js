const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Feedback Model
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // Middleware to verify tokens
const adminMiddleware = require('../middleware/admin'); // Middleware to verify admin access

// Get all users - Admin only
// Fetch all users (Admin only)
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch user feedback (Admin only)
router.get('/admin/feedback', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.find({}).populate('userId', 'name email');
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Assign admin role to a user (Admin-only)
router.post('/assign-admin', authMiddleware, adminMiddleware, async (req, res) => {
  const { userId } = req.body; // ID of the user to promote
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = "admin";
    await user.save();
    res.json({ message: "User promoted to admin successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  console.log("Admin route accessed by:", req.user);
  res.send('Welcome to the admin dashboard!');
});



module.exports = router;

