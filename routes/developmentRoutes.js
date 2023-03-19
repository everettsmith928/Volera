const express = require('express');
const dbController = require('../controllers/dbController');
const xummController = require('../controllers/xummController');
const router = express.Router();

//About
router.get('/', (req, res) => {
    res.render('development/development');
})

//Wallet GET
router.get('/wallet', (req, res) => {
    res.render('development/wallet', {userMessage: ''});
})

//Wallet POST
router.post('/wallet', dbController.contact);

//Sign-in
//Wallet GET
router.get('/signin', (req, res) => {
    res.render('development/signin');
})

module.exports = router;