const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// const { error } = require('console');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partailsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsDirectory);
app.set('view engine', 'hbs');
hbs.registerPartials(partailsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather app!',
        name: 'Amir' 
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Amir' 
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hey, I am here to help!',
        title: 'help is available.',
        name: 'Amir'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'please provide and address.'
        });
    }

    geocode(req.query.address, (error, {longitude, laditude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            });
        };

        forecast(longitude, laditude, (error, {weather_descriptions, temperature, feelslike} = {}) => {
            if(error) {
                return res.send({
                    error: error
                });
            };
            
            res.send({
                searched_address: req.query.address,
                location,
                weather_descriptions: weather_descriptions[0],
                temperature,
                feelslike
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help articale was not found.',
        title: '404',
        name: 'Amir'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'page was not found.',
        title: '404',
        name: 'Amir'
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}.`);
});