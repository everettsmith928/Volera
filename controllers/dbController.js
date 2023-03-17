// Server File
const mysql = require('mysql2');
const fs = require('fs');
const emailController = require('./emailController');
require('dotenv').config();

console.log(process.env.DATABASE);

// Database Connection
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  ssl: {
    ca: fs.readFileSync('./ca-certificate.crt'),
    rejectUnauthorized: false
  }
});

// Connect to DB
pool.getConnection(function (err, con) {
  if (err) {
    if (eventNameIndex.error) {
      eventNameIndex.error();
    }
  }
  else if (con) {
    console.log("Database Connected!");
    con.release();
  }
});

//CONTACT
const contact = (req, res) => {
  console.log(req.body);

  var userMessage = '';
  pool.query(
    'INSERT INTO contact_sheet SET ?', //Question mark is object
    req.body,                          //Object to be passed
    function (err, results) {
      //Error handling
      if (err) {
        console.log(err);
        userMessage = 'There was an error, feel free to manually email us at ' + process.env.MAIL_USERNAME + '<br>' + req.body.contact_form;
      }
      //Added to sheet
      else {
        userMessage = 'Thank you for your feedback. We will attempt to respond within 72 hours.';
        emailController.contact(req.body);
      }
      //Redirect
      console.log(userMessage);
      res.render('./contact', { userMessage: userMessage });
    }
  );
}

//SIGNUP
const signup = (req, res) => {
  console.log(req.body);
  req.body.first_name = toTitleCase(req.body.first_name);
  req.body.last_name = toTitleCase(req.body.last_name);
  req.body.email = req.body.email.toLowerCase();

  var userMessage = '';
  pool.query(
    'INSERT INTO signup_sheet SET ?', //Question mark is object
    req.body,                         //Object to be passed
    function (err, results) {
      //Error handling
      if (err) {
        err = undefined;
        console.log(err);
        if (err?.sqlMessage.includes('Duplicate')) {
          userMessage = req.body.email + ' already exists!';
        } else {
          userMessage = 'There was an error adding ' + req.body.email;
        }
      }
      //Added to sheet
      else {
        userMessage = 'Thank you ' + req.body.first_name + '!<br><br>Your email ' + req.body.email + ' has been added to signup sheet.';
        emailController.signup(req.body);
      }
      //Redirect
      console.log(userMessage);
      res.render('./signup', { userMessage: userMessage });
    }
  );
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

module.exports = {
  signup,
  contact
}