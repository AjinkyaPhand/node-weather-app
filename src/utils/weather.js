const request = require('request')

const weather = (place, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3994d71ac80e103e22d428dd1a0b095a&query=" + place
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Some problem occured while connecting to API', undefined)
        }
        else if (response.body.error) {
            callback('Invalid location', undefined)
        }
        else {
            callback(undefined, {
                weather_descriptions: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature
            })
        }
    })
}

module.exports = weather

