// Server File
const mysql = require('mysql2');
const fs = require('fs');
const emailController = require('./emailController');
require('dotenv').config();


// Database Connection
const con = mysql.createConnection({
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
con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

//Add user to signup sheet
const signup = (req, res) => {
  console.log(req.body);
  req.body.first_name = toTitleCase(req.body.first_name);
  req.body.last_name = toTitleCase(req.body.last_name);
  req.body.email = req.body.email.toLowerCase();

  var userMessage = '';
  con.query(
    'INSERT INTO signup_sheet SET ?', //Question mark is object
    req.body,                         //Object to be passed
    function (err, results) {
      //Error handling
      if (err) {
        console.log(err);
        if (err.sqlMessage.includes('Duplicate')) {
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
      res.render('./signup', { userMessage: userMessage});
    }
  );
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

module.exports = {
  signup
}