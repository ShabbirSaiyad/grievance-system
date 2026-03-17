const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error(
        'Missing MONGO_URI. Create backend/.env (copy from backend/.env.example) and set MONGO_URI.'
      );
    }

    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

