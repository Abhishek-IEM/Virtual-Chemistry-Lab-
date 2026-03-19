const express = require('express');
const protect = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// GET /user/profile
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /user/update-points
router.post('/update-points', protect, async (req, res) => {
  try {
    const { experimentId, points } = req.body;
    const user = req.user;

    let alreadyCompleted = user.completedExperiments.includes(experimentId);

    if (!alreadyCompleted) {
      user.completedExperiments.push(experimentId);
      user.totalPoints += points;
      await user.save();
    }

    res.json({
      success: true,
      alreadyCompleted,
      points: user.totalPoints,
      completedExperiments: user.completedExperiments,
      message: alreadyCompleted ? 'Experiment already completed. No extra points.' : `+${points} points awarded!`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
