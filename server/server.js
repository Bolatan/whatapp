const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log("🧾 ENV CHECK:", {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI_EXISTS: !!process.env.MONGO_URI,
  PORT: process.env.PORT,
});

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('❌ Missing MONGO_URI! Check your Render environment variables.');
  process.exit(1);
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB database connection established successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Use regex to serve React app for non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});

module.exports = app;
