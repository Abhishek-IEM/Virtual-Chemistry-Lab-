const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');

async function testSignup() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  try {
    const name = "Diagnostic User";
    const email = "diag_" + Date.now() + "@test.com";
    const password = "password123";

    console.log('Starting hash...');
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Hashed.');

    console.log('Creating user...');
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      totalPoints: 0,
      completedExperiments: []
    });
    console.log('User created:', user._id);

    console.log('Signing token...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('Token signed.');

    await User.deleteOne({ _id: user._id });
    console.log('Cleaned up.');
  } catch (err) {
    console.error('DIAGNOSTIC ERROR:', err);
  } finally {
    await mongoose.disconnect();
  }
}

testSignup();
