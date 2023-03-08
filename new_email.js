// New user E-mail to database and auto send welcome E-mail
const https = require('https');
const db_connect = require('./db_connect');
const nodemailer = require('nodemailer');
const express = require('express');

const app = express();
const port = 3000;
//var newEmail = Email pulled from Database


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
});

// Grab info from HTML Form and upload to Database
app.get('/processNewUser', function (req, res) {
  // Prepare output in JSON format
  userInput = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    email: req.query.email
  };
  addUserToDatabase(userInput)
  console.log(userInput);
});

// Add to signup table
function addUserToDatabase(userInput) {
  var sql = "INSERT INTO signup_sheet VALUES ('" + userInput.email + "', '" + userInput.first_name + "', '" + userInput.last_name + "');";
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    else {
      console.log(result);
      sendEmail();
    }
  });
}

// Send welcome Email to Registered user
function sendEmail() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: 'garrettsmith@volera.io',
    subject: 'Sending Email using Node.js',
    html: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}