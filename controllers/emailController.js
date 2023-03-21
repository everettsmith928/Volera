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
    sendEmail(mailOptions);
}

const contact = (user) => {
    console.log('Emailing contact form verification to:' + user.contact_email);

    var mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.contact_email,
        bcc: 'contact@volera.io',
        subject: 'Volera Contact Form',
        html: '<h1>Thank you for your question submission.</h1><br>We will get back to you in 72 hours in regards to: <br><br>'
            + user.contact_subject + '<br><br>' + user.contact_form
    }

    sendEmail(mailOptions);
}

function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    signup,
    contact
}