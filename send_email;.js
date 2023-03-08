// New user E-mail to database and auto send welcome E-mail
const https = require('https');
const nodemailer = require('nodemailer');
const express = require('express');

const app = express();

// Send welcome Email to Registered user
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact@volera.io',
    pass: 'bxpyzwfivkyxfsot'
  }
});

var mailOptions = {
  from: 'contact@volera.io',
  to: 'garrettsmith@volera.io',
  subject: 'Sending Email using Node.js',
  html: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});