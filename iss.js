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

  // Fetch ip address
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("Getting the IP didn't work" , error);
      return;
    }

    // console.log('Getting the IP worked. Returned IP:' , ip);


    // fetch geo cords
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.log("Getting the geo cords didn't work" , error);
        return;
      }

      // console.log('Getting the geo cords worked. Here is the lat and long:' , coordinates);

      // const coords = { latitude: '49.27670', longitude: '-123.13000' }
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          console.log("Getting the fly times didn't work" , error);
          return;
        }

        // console.log('Getting the fly times worked', passTimes);
        callback(null, passTimes);
      });
    });
  });
};



module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};

