const express = require('express');
const dbController = require('../controllers/dbController');
const xummController = require('../controllers/xummController');
const xrplController = require('../controllers/xrplController');
const router = express.Router();

//Development
router.get('/', (req, res) => {
    res.render('development/development');
})

//Wallet GET
router.get('/wallet', (req, res) => {
    res.render('development/wallet', {userMessage: ''});
})

//Wallet POST
router.post('/wallet', xrplController.getUserWallet);

//Sign-in
router.get('/signin', (req, res) => {
    res.render('development/signin');
})

//Transaction History GET
router.get('/txhistory', (req, res) => {
    res.render('development/txhistory', {userMessage: ''});
})

//Transaction History POST
router.post('/txhistory', xrplController.getUserTxHistory);

module.exports = router;