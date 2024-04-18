// index.js
require('dotenv').config();
const nodemailer = require('nodemailer');
// const cryptoRandomString = require('crypto-random-string');

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure:true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// const mailOptions = {
//     from: 'medicaresolution2024@gmail.com',
//     to: 'recipient@example.com',
//     subject: 'Test Email',
//     text: 'This is a test email sent using Nodemailer!',
//   };
const generateOTP = (length) => {
    let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
  }
  return otp;
  };
  
  // Send OTP via email
  const sendOTPByEmail = async (recipientEmail, otp) => {
    try {
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: recipientEmail,
        subject: 'Your One-Time Password (OTP)',
        text: `Your OTP is: ${otp}`,
      });
      console.log('OTP sent successfully!');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  
  // Example usage
  const recipientEmail = 'example@gmail.com';
  const otp = generateOTP(6);
  
  sendOTPByEmail(recipientEmail, otp);

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error occurred:', error.message);
//     } else {
//       console.log('Email sent successfully!');
//       console.log('Message ID:', info.messageId);
//     }
//   });