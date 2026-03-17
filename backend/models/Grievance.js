const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: 'General'
    },
    department: {
      type: String,
      default: 'General Administration'
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low'
    },
    trackingId: {
      type: String,
      unique: true,
      required: true
    },
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comments: String,
      createdAt: Date
    },
    appeal: {
      reason: String,
      status: {
        type: String,
        enum: ['Submitted', 'Reviewed', 'Rejected', 'Accepted'],
        default: 'Submitted'
      },
      createdAt: Date
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

module.exports = mongoose.model('Grievance', grievanceSchema);

