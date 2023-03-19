const express = require('express');
const aboutRoutes = require('./routes/aboutRoutes');
const platformRoutes = require('./routes/platformRoutes');
const developmentRoutes = require('./routes/developmentRoutes');
const winston = require('winston');
const app = express();

//Start server
app.listen(3000);

//Use EJS
app.set('view engine', 'ejs');

//Share public files
app.use(express.static('public'));

//Favicon
app.use('/favicon.ico', express.static('public/images/favicon.ico'));

//Grab form data
app.use(express.urlencoded({ extended: true }));

//Splash page
app.get('/', (req, res) => {
    res.render('index');
    //See where people come from
    if (JSON.stringify(req.query) !== '{}') {
        console.log(req.query);
    }
});

//About pages
app.use('/about', aboutRoutes);

//About pages
app.use('/platform', platformRoutes);

//Development pages
app.use('/development', developmentRoutes);

//Default
app.use((req, res) => {
    res.status(404).render('404');
});