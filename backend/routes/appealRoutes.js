const express = require('express');
const Grievance = require('../models/Grievance');

const router = express.Router();

// POST /api/appeal
router.post('/', async (req, res) => {
  try {
    const { trackingId, reason } = req.body;

    if (!trackingId || !reason) {
      return res.status(400).json({ message: 'Tracking ID and reason are required' });
    }

    const grievance = await Grievance.findOne({ trackingId });
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    grievance.appeal = {
      reason,
      status: 'Submitted',
      createdAt: new Date()
    };

    await grievance.save();

    res.json({ message: 'Appeal submitted', grievance });
  } catch (err) {
    console.error('Error submitting appeal:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

