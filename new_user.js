// New user E-mail to database and auto send welcome E-mail
const https = require('https');
const db_connect = require('./db_connect');
const nodemailer = require('nodemailer');
const express = require('express');

const app = express();

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`)
  });

// Grab info from HTML Form and upload to Database
    app.get('/processNewUser', function (req, res) {
    // Prepare output in JSON format
    userInput = {
        first_name:req.query.first_name,
        last_name:req.query.last_name,
        email:req.query.email
    };
    console.log(userInput);


// Add to Profiles table
    var sql = "CALL InsertNewUser('" + userInput.email + "', '" + hash + "', '" + userInput.first_name + "', '" + userInput.last_name + "');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });

// Send welcome Email to Registered user
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });