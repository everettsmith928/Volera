const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

// Send welcome Email to Registered user
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const signup = (user) => {
    console.log('Emailing ' + user.first_name + ' at ' + user.email);

    var mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: 'Volera Milestones Notification Sign-up',
        html: 'Welcome ' + user.first_name + '.<br>' + fs.readFileSync('./emails/signup.html')
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    signup
}