const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./connectDB');

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Add Student Route
app.post('/add-student', async (req, res) => {
  try {
    const db = await connectDB();
    const student = req.body; // expects JSON { name, role, rfid }
    const result = await db.collection('students').insertOne(student);
    res.status(200).json({ message: 'Student added', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding student' });
  }
});

app.listen(5000, () => console.log('✅ Server running on port 5000'));
