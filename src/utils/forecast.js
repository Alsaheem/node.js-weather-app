//Forecast Results

const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0956ffc62765b09b3a72f4644cd4ecd8&query=${longitude},${latitude}`;
  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback(`Unable to connect to a weather service`, undefined);
    } else if (response.body.error) {
      callback(`Unable to find location`, undefined);
    } else {
      let data = response.body.current;
      callback(undefined, {
        temperature: data.temperature,
        feelslike: data.feelslike,
      });
    }
  });
};



module.exports = forecast