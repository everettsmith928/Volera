const express = require('express');
const dbController = require('../controllers/dbController');
const router = express.Router();

//Platform
router.get('/', (req, res) => {
    res.render('platform/platform');
})

module.exports = router;