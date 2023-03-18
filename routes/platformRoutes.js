const express = require('express');
const dbController = require('../controllers/dbController');
const router = express.Router();

//About
router.get('/', (req, res) => {
    res.render('platform/platform');
})

module.exports = router;