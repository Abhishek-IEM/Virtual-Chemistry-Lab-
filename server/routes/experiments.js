const express = require('express');
const protect = require('../middleware/auth');
const Experiment = require('../models/Experiment');
const User = require('../models/User');
const router = express.Router();

// GET all experiments
router.get('/', protect, async (req, res) => {
  try {
    const experiments = await Experiment.find({});
    // req.user is populated by 'protect' middleware
    const user = req.user;
    
    const experimentsWithStatus = experiments.map(exp => ({
      ...exp._doc,
      completed: user.completedExperiments.includes(exp.id),
      // If we had per-experiment points tracking in the array, we would look it up here.
      // For now, based on User.js which is [{type: String}], we just check if ID is present.
    }));
    
    res.json({ success: true, experiments: experimentsWithStatus });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /experiments/complete — mark experiment as complete, award points
router.post('/complete', protect, async (req, res) => {
  try {
    const { experimentId } = req.body;
    const experiment = await Experiment.findOne({ id: experimentId });
    if (!experiment) return res.status(404).json({ message: 'Experiment not found' });

    const user = req.user;
    const alreadyCompleted = user.completedExperiments.includes(experimentId);

    if (!alreadyCompleted) {
      user.completedExperiments.push(experimentId);
      user.totalPoints += experiment.points;
      await user.save();
    }

    res.json({
      success: true,
      alreadyCompleted,
      earnedPoints: alreadyCompleted ? 0 : experiment.points,
      totalPoints: user.totalPoints,
      completedExperiments: user.completedExperiments,
      message: alreadyCompleted
        ? 'You already completed this experiment! No extra points.'
        : `🎉 Experiment completed! +${experiment.points} points awarded!`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /experiments/status — get user's completion status
router.get('/status', protect, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      completedExperiments: user.completedExperiments,
      points: user.totalPoints,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
