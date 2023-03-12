const mysql = require('mysql2');
const fs = require('fs');
const nodemailer = require('nodemailer');
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

//Prepare email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

con.connect(function (err) {
    if (err) throw err;
    userList = [];

    //Grab users
    con.query("SELECT email FROM signup_sheet", function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            userList.push(result[i].email);
        }
        console.log(userList).length();

        //Prepare email
        var mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: 'contact@volera.io',
            bcc: userList,
            subject: 'Testing Email Notification Signup List',
            html: fs.readFileSync('./emailList.html'),
        }

        //Send email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                process.exit();
            }
        });
    });
});