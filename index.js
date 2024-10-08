require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Create express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error: ', err));

// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
