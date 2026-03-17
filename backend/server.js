const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigin = process.env.CLIENT_URL || '*';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

// DB connection
connectDB();

// Routes
const grievanceRoutes = require('./routes/grievanceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const appealRoutes = require('./routes/appealRoutes');

app.use('/api/grievances', grievanceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/appeal', appealRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Smart Public Grievance System API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

