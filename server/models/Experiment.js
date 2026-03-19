const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate'], default: 'Beginner' },
  duration: { type: String, required: true },
  points: { type: Number, required: true },
  icon: { type: String, default: '🧪' },
  steps: [{
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    instruction: { type: String, required: true }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Experiment', experimentSchema);
