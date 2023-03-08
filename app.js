const express = require('express');

const app = express();

app.listen(3000);

app.set('view engine', 'ejs');

//Index
app.get('/', (req, res) => {
    res.render('index', {name: 'Garrett'});
});

//About

//Signup

//Default
app.use((req, res) => {
    res.status(404).render('404');
});