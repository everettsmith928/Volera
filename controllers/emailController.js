const nodemailer = require('nodemailer');
require('dotenv').config();

// Send welcome Email to Registered user
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});
console.log('Email connected');

const signup = (user) => {
    console.log('Emailing ' + user.first_name + ' at ' + user.email);

    var mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: 'Volera Milestones Notification Sign-up',
        html: 'Welcome ' + user.first_name + '. Thank you for signing up! We will notify you when milestones have been completed.'
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