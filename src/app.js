const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

//Config paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//config to use static directory 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, resp) => {
    resp.render('index', {
        title: "Weather App",
        name: "Ajinkya Phand"
    })
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: "About",
        name: "Ajinkya Phand"
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: "Help",
        name: "Ajinkya Phand"
    })
})

app.get('/weather', (req, resp) => {
    if (!req.query.address) {
        return resp.send({
            error: "Invalid request. Please try again with another search"
        })
    }
    // Object Destructuring in function call with default params {}
    geocode(req.query.address, (error, { Place, Latitude, Longitiude } = {}) => {
        if (error) {
            return resp.send({
                error                       // Object shorthand syntax
            })
        }
        weather(Place, (error, { weather_descriptions, temperature } = {}) => {
            if (error) {
                return resp.send({
                    error                       // Object shorthand syntax
                })
            }
            resp.send({
                Place: Place,
                weather: weather_descriptions,
                temperature
            })
        })
    })

})

app.get('/help/*', (req, resp) => {
    resp.render('404', {
        title: "404",
        name: "Ajinkya Phand",
        errorMessage: "Help page article not found"
    })
})


app.get('*', (req, resp) => {
    resp.render('404', {
        title: "404",
        name: "Ajinkya Phand",
        errorMessage: "Page not found !!!"
    })
})

app.listen(3000, () => {
    console.log("Server started on port : 3000")
})