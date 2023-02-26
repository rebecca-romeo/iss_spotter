const request = require('request');

// Fetch IP address
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 200) {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
      return;
    } else {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

// Fetch Geolocation coordinates
const  fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);


    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

      const latitude = parsedBody.latitude;
      const longitude = parsedBody.longitude;
      const latAndLong = {
        latitude,
        longitude
      };
      callback(null, latAndLong);
      return;

    // cleaner version from toggle answer, uses destructuring:
    // const { latitude, longitude } = parsedBody;
    // callback(null, {latitude, longitude});
  });
};

// Fetch Flyover times
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  // empty for now
}



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};




//--------------------------------------------------------------------
// cleaner version of response status to replace the if/else in fetchIp function

// if (response.statusCode !== 200) {
//   callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
//   return;
// }

// const ip = JSON.parse(body).ip;
// callback(null, ip);

//--------------------------------------------------------------------





// use request to fetch IP address from JSON API
// request('https://api.ipify.org?format=json', (error, response, body) => {

//   console.log("ip address is:", body)
// });

//https://api.ipify.org?format=json

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// console.log('error:', error); // Print the error if one occurred
// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// console.log('body:', body); // Print the HTML for the Google homepage.