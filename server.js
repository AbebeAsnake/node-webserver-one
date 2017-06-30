const express = require('express'),
    hbs = require('hbs'),
    fs = require('fs');
//<title>some website</title>
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}:${req.url}`;
    //console.log(`${now}: ${req.method}:${req.url}`);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    //res.send('<h1>hello express</h1>');
    /*res.send({
        name: 'Abe',
        linkes: [
            'bikink',
            'movies'
        ]
    })*/
    res.render('home.hbs', {
        pagetitle: 'homepage',
        welcomeMessage: 'welcome to website',
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page from server.js injected',

    });
    //res.send('About page');
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});