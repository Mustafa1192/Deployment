// Complete Backend with all requirements
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // To generate OTP
const bcrypt = require('bcrypt'); // To hash passwords

// Load environment variables
require('dotenv').config();

const syllabus = require('./modules/syllabus.json');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully 🚀'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
  
// Define Schema and Model for 'sixbida' collection
const QuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  unit: Number,
  subject: String,
  year: String,
}, { collection: 'sixbida' }); // Specify the collection name

const Question = mongoose.model('Question', QuestionSchema);

// API Route for fetching all questions and answers
app.get('/all-questions', async (req, res) => {
  try {
    const questions = await Question.find({}, 'question answer'); // Fetch all questions and their answers
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/unit-1-questions', async (req, res) => {
  try {
    const questions = await Question.find({unit: 1}, 'question answer'); // Fetch all questions and their answers
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Route for fetching questions from unit 2
app.get('/unit-2-questions', async (req, res) => {
  try {
    const questions = await Question.find({ unit: 2 }, 'question answer'); // Filter by unit 2
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Route for fetching questions from unit 3
app.get('/unit-3-questions', async (req, res) => {
  try {
    const questions = await Question.find({ unit: 3 }, 'question answer'); // Filter by unit 3
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Route for fetching questions from unit 4
app.get('/unit-4-questions', async (req, res) => {
  try {
    const questions = await Question.find({ unit: 4 }, 'question answer'); // Filter by unit 4
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Route for fetching questions from unit 5
app.get('/unit-5-questions', async (req, res) => {
  try {
    const questions = await Question.find({ unit: 5 }, 'question answer'); // Filter by unit 5
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Route for fetching questions from unit 6
app.get('/unit-6-questions', async (req, res) => {
  try {
    const questions = await Question.find({ unit: 6 }, 'question answer'); // Filter by unit 6
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define Main User Schema (No TTL index)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }
}, { collection: 'User', timestamps: true });

const User = mongoose.model('User', userSchema);

// Define TempUser Schema (For OTP verification)
const tempUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date }
}, { collection: 'TempUser', timestamps: true });

const TempUser = mongoose.model('TempUser', tempUserSchema);

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'onemenu.it@gmail.com',
//     pass: 'euwo vymq gdxb jsmf'
//   }
// });
// Nodemailer configuration

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Ensure this is set in Render
    pass: process.env.EMAIL_PASS, // Use App Password, NOT Gmail password
  },
});

app.post("/send-otp", async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username is already taken!" });

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    let tempUser = await TempUser.findOne({ email });

    if (tempUser) {
      tempUser.otp = otp;
      tempUser.otpExpires = Date.now() + 60000;
      await tempUser.save();
    } else {
      tempUser = new TempUser({ username, email, otp, otpExpires: Date.now() + 60000 });
      await tempUser.save();
    }

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Should match your email
      to: email,
      subject: "Complete Your Registration with Bsc IT Originals Notes",
      text: `Hi ${username},\n\nYour OTP is: ${otp}\n\nPlease enter it within 60 seconds.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({ message: "New OTP sent to your email!" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ message: "Error sending OTP email!" });
  }
});

// Route to verify OTP and complete registration (Step 2)
app.post('/verify-otp', async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    // Find user in TempUser collection
    const tempUser = await TempUser.findOne({ email, otp });

    if (!tempUser) {
      return res.status(400).json({ message: 'Invalid OTP!' });
    }

    if (Date.now() > tempUser.otpExpires) {
      return res.status(400).json({ message: 'OTP has expired :) ' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Transfer user from TempUser to User collection
    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: hashedPassword
    });

    await newUser.save();

    // Remove the user from TempUser collection
    await TempUser.deleteOne({ email });

    res.status(200).json({ message: 'Registration successful 👍' });
  } catch (error) {
    res.status(500).json({ message: 'Server error :)' });
  }
});

// Route to handle Resend OTP
app.post('/resend-otp', async (req, res) => {
  const { email } = req.body;

  try {
    // Find user in TempUser collection
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(400).json({ message: 'User not found or already verified!' });
    }

    // Generate a new OTP
    const newOtp = crypto.randomInt(100000, 999999).toString();
    tempUser.otp = newOtp;
    tempUser.otpExpires = Date.now() + 60000; // New expiry
    await tempUser.save();

    // Send OTP via email
    const mailOptions = {
      // from: 'onemenu.it@gmail.com',  // Replace with your actual email
      from: process.env.EMAIL_USER,
  // Replace with your actual email
      to: email,
      subject: 'Complete Your Registration with Bsc IT Originals Notes',
      text: `Hi ${username},
    
    Thanks for registering at Bsc IT Originals Notes!
    
    Your verification OTP is: **${otp}**. Please enter it within 60 seconds to complete your registration.
    
    If you did not make this request, simply ignore this email. Your account remains safe.
    
    For support or questions, contact us at: bscitoriginals@gmail.com
    
    Best regards,  
    The Bsc IT Originals Notes Team
    
    ---
    
    This is an automated email. Please do not reply.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP email!' });
      }
      res.status(200).json({ message: 'New OTP sent to your email!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password!' });
    }

    res.status(200).json({ message: 'Login successful! 👍', user: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



///////////////////////////////////////// Forgot Password Feature /////////////////////////////////////////////

// Route to send OTP for password reset
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists in Main User collection
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: 'User not found! Please register first.' });
    }

    // Generate a new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 60000; // 1-minute expiry

    // Upsert TempUser with OTP
    await TempUser.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { upsert: true, new: true }
    );

    //Send OTP via email
    const mailOptions = {
      from: 'onemenu.it@gmail.com',
      to: email,
      subject:  'Reset Your Password - Bsc IT Originals Notes',
      text: `We received a request to reset your password on Bsc IT Originals Notes.

Use the OTP below within the next 60 seconds to reset your password:

OTP: ${otp}

Important: If you did not request this, please ignore the email. Your account remains secure.

For your security:
- Do not share this OTP with anyone.
- Only use this OTP on the official Bsc IT Originals Notes portal.

If you have concerns or did not request this reset, please contact our support team at bscitoriginals@gmail.com.

Best regards,  
The Bsc IT Originals Notes Team

Note: This is an automated message. Replies to this email are not monitored.`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP!' });
      }
      res.status(200).json({ message: 'OTP sent to your email.' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to verify OTP and reset password
app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find the OTP in TempUser collection
    const tempUser = await TempUser.findOne({ email, otp });

    if (!tempUser) {
      return res.status(400).json({ message: 'Invalid or expired OTP!' });
    }

    if (Date.now() > tempUser.otpExpires) {
      return res.status(400).json({ message: 'OTP has expired!' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the User collection
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    // Remove the TempUser entry
    await TempUser.deleteOne({ email });

    res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
