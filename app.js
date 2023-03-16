const express = require('express');
const dbController = require('./controllers/dbController');

const app = express();

//Start server
app.listen(3000);

//Use EJS
app.set('view engine', 'ejs');

//Share public files
app.use(express.static('public'));

//Grab form data
app.use(express.urlencoded({extended: true}));

//Index
app.get('/', (req, res) => {
    res.render('index');
});

//About
app.get('/about', (req, res) => {
    res.render('about');
})

//Roadmap
app.get('/roadmap', (req, res) => {
    res.render('roadmap');
})

//Signup GET
app.get('/signup', (req, res) => {
    res.render('signup', {userMessage: ''});
})

//Signup POST
app.post('/signup', dbController.signup);


//Contact GET
app.get('/contact', (req, res) => {
    res.render('contact', {userMessage: ''});
})

//Contact POST
app.post('/contact', dbController.contact);

//Default
app.use((req, res) => {
    res.status(404).render('404');
});