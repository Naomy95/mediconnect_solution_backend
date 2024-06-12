// index.js
const express = require('express'); 
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
// const cryptoRandomString = require('crypto-random-string');
const { MongoClient } = require('mongodb');
const port=process.env.PORT || 4000
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const doctor = require('./routers/doctorRouter'); 
const nurse =require('./routers/nurseRouter')
const admin =require('./routers/adminLoginRouter')

const uri = `mongodb+srv://Hospital_Project:EuqASExlGld6YoTd@cluster0.kvzsn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();


const corsOptions ={
  origin:'*', 
  credentials:true,  
            //access-control-allow-credentials:true
   methods: [
              'GET',
              'POST',
              'PUT',
              'DELETE'
            ],
  optionSuccessStatus:200
}

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

// const mailOptions = { do not use it
//     from: 'medicaresolution2024@gmail.com',
//     to: 'recipient@example.com',
//     subject: 'Test Email',
//     text: 'This is a test email sent using Nodemailer!',
//   };
// const generateOTP = (length) => {
//     let otp = '';
//   for (let i = 0; i < length; i++) {
//     otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
//   }
//   return otp;
//   };
  
  // Send OTP via email
  // const sendOTPByEmail = async (recipientEmail, otp) => {
  //   try {
  //     await transporter.sendMail({
  //       from: process.env.MAIL_FROM,
  //       to: recipientEmail,
  //       subject: 'Your One-Time Password (OTP)',
  //       text: `Your OTP is: ${otp}`,
  //     });
  //     console.log('OTP sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending OTP:', error);
  //   }
  // };
  
  // Example usage
  // const recipientEmail = 'example@gmail.com';
  // const otp = generateOTP(6);
  
  // sendOTPByEmail(recipientEmail, otp);

//   transporter.sendMail(mailOptions, (error, info) => { do not use it
//     if (error) {
//       console.log('Error occurred:', error.message);
//     } else {
//       console.log('Email sent successfully!');
//       console.log('Message ID:', info.messageId);
//     }
//   });

const app = express(); 

app.use(bodyParser.json())

app.use(cors(
   corsOptions
));
app.use(express.json());


app.use(doctor)
app.use(nurse)
app.use(admin)

  
app.listen(port, () => { 

  console.log(`listening on :${port}`); 
});