const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiYW1pcm9vZGkiLCJhIjoiY2wycjRsaDlmMDJqYzNscGc0YXd3MzA4aiJ9.rBnQ4IIuuY6Vs8HZ7BJaAA`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to mapbox.', undefined);
        } else if(body.features.length === 0) {
            callback('location was not found! Try another search.', undefined);
        } else {
            callback(undefined ,{
                longitude: body.features[0].center[0],
                laditude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;