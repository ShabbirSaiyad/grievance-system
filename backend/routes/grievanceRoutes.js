const express = require('express');
const Grievance = require('../models/Grievance');
const { detectCategory, detectPriority, openAIClassifyAndSummarize } = require('../utils/ai');

const router = express.Router();

// Helper to generate tracking ID
function generateTrackingId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GRV-${ts}-${rand}`;
}

// POST /api/grievances - Create new grievance with AI category/priority
router.post('/', async (req, res) => {
  try {
    const { name, description, category, department } = req.body;
    console.log(req.body)

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const keywordCategory = detectCategory(description);
    const keywordPriority = detectPriority(description);

    let aiResult = {};
    try {
      aiResult = await openAIClassifyAndSummarize(description);
    } catch (e) {
      aiResult = {};
    }

    const finalCategory = aiResult.aiCategory || category || keywordCategory;
    const finalPriority = aiResult.aiPriority || keywordPriority;

    const trackingId = generateTrackingId();

    const grievance = await Grievance.create({
      name,
      description,
      category: finalCategory,
      department: department || finalCategory,
      status: 'Pending',
      priority: finalPriority,
      trackingId
    });

    res.status(201).json({
      message: 'Grievance submitted successfully',
      grievance,
      aiSummary: aiResult.summary || null
    });
  } catch (err) {
    console.error('Error creating grievance:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/grievances - list all (with optional status filter)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;

    const grievances = await Grievance.find(query).sort({ createdAt: -1 });
    res.json(grievances);
  } catch (err) {
    console.error('Error fetching grievances:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/grievances/:trackingId - Get by tracking ID
router.get('/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const grievance = await Grievance.findOne({ trackingId });

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json(grievance);
  } catch (err) {
    console.error('Error fetching grievance:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/grievances/:id - Update grievance (status, etc.)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent trackingId change
    delete updates.trackingId;

    const grievance = await Grievance.findByIdAndUpdate(id, updates, {
      new: true
    });

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json({ message: 'Grievance updated', grievance });
  } catch (err) {
    console.error('Error updating grievance:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

