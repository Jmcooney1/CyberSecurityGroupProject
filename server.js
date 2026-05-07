require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');                                    // ADD THIS
const BetterSqlite3 = require('better-sqlite3');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('./generated/prisma');

const db = new BetterSqlite3(path.join(__dirname, './prisma/dev.db'));
const adapter = new PrismaBetterSqlite3(db);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors({
  origin: 'http://localhost:8081'
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// LOGIN ROUTE - reads from users.json
app.post('/api/login', (req, res) => {
  console.log("Received login:", req.body);
  const { username, password } = req.body;

  const users = fs.existsSync('users.json')
    ? JSON.parse(fs.readFileSync('users.json'))
    : [];

  const match = users.find(u => u.username === username && u.password === password);

  if (match) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});

// EMAIL ROUTE - unchanged
app.post('/send-email', async (req, res) => {
  console.log('Request received:', req.body);
  const { toEmail, recipientName } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Check out our website!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello, ${recipientName || 'there'}!</h2>
        <p>We'd love for you to visit our website. Click the button below:</p>
        <a href="${process.env.SITE_URL}" style="display: inline-block; background-color: #4A90E2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; margin: 16px 0;">
          Visit Our Page
        </a>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

process.on('uncaughtException', (err) => {
  console.error('Uncaught error:', err);
});