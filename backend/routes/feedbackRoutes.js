const express = require('express');
const Grievance = require('../models/Grievance');

const router = express.Router();

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { trackingId, rating, comments } = req.body;

    if (!trackingId || !rating) {
      return res.status(400).json({ message: 'Tracking ID and rating are required' });
    }

    const grievance = await Grievance.findOne({ trackingId });
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    grievance.feedback = {
      rating,
      comments,
      createdAt: new Date()
    };

    await grievance.save();

    res.json({ message: 'Feedback submitted', grievance });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

