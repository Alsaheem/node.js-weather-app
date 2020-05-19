//Geocoding
//Address -> latitude- longitude
const request = require("request");

const geocode = (address, callback) => {
  const geocoding_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWxzYWhlZW0iLCJhIjoiY2thOWJ5djdqMDN2eDJ0b2liZDR0Nm5wNyJ9.zA1CzP2rzGQrTevutbL9PA&limit=1`;

  request({ url: geocoding_url, json: true }, (err, {body}) => {
    if (err) {
      callback(`Unableto connect, please check your Network`, undefined);
    } else if (body.message || body.features.length == 0) {
      callback(`please input a valid search location`, undefined);
    } else {
      let data = body.features[0];
      callback(
        undefined,{
          longitude :data.center[0],
          latitude :data.center[1],
          location :data.place_name,
        }

      );
    }
  });
};


module.exports = geocode
