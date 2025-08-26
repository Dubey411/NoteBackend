const express = require('express');
const cors = require('cors');
require('dotenv').config(); // load env
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();

// Middleware
// app.use(cors());
app.use(cors({ origin: "note-frontend-psi.vercel.app
" }));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Backend is connected 🎉' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/notes", notesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ msg: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
