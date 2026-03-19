const nodemailer = require('nodemailer');

let transporter;

if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
} else {
  console.warn('⚠️ SMTP credentials not set in .env. Email features will not work.');
  // Mock transporter to avoid crashes
  transporter = {
    sendMail: async () => {
      console.error('❌ Cannot send email: MISSING_SMTP_CREDENTIALS');
      throw new Error('Email service not configured');
    }
  };
}

module.exports = transporter;
