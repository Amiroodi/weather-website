const request = require('request');

const forecast = (longitude, laditude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=31334e872b8c9400f6ba88706dd0f50b&query=${laditude},${longitude}&units=m`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to weather service.', undefined);
        } else if(body.error) {
            callback('chosen location was not found!', undefined);
        } else {
            const current = body.current;
            callback(undefined, current);
        }
    });
};

module.exports = forecast;