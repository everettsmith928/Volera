const express = require('express');
const dbController = require('../controllers/dbController');
const router = express.Router();

//About
router.get('/', (req, res) => {
    res.render('about/about');
})

//About
router.get('/platform', (req, res) => {
    res.render('about/aboutplatform');
})

//Roadmap
router.get('/roadmap', (req, res) => {
    res.render('about/roadmap');
})

//Signup GET
router.get('/signup', (req, res) => {
    res.render('about/signup', {userMessage: ''});
})

//Signup POST
router.post('/signup', dbController.signup);

//Contact GET
router.get('/contact', (req, res) => {
    res.render('about/contact', {userMessage: ''});
})

//Contact POST
router.post('/contact', dbController.contact);

module.exports = router;