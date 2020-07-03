const request = require('request')


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWppbmt5YXBoYW5kIiwiYSI6ImNrYnM4dThraTAxYTMyem9kZmJuOTY5bWcifQ.CJO6EvF4o8OzT38dlZ3D9g&limit=1"
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Some problem occured while connecting to API", undefined)
        }
        else if (response.body.features.length === 0) {
            callback("Invalid Request", undefined)
        }
        else {
            callback(undefined, {
                Place: response.body.features[0].place_name,
                Latitude: response.body.features[0].center[1],
                Longitiude: response.body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode