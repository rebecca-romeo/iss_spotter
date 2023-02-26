// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// Fetch ip address
fetchMyIP((error, ip) => {
  if (error) {
    console.log("Getting the IP didn't work" , error);
    return;
  }

  console.log('Getting the IP worked. Returned IP:' , ip);
});

// fetch geo cords
fetchCoordsByIP('99.225.184.241', (error, coordinates) => {
  if (error) {
    console.log("Getting the geo cords didn't work" , error);
    return;
  }

  console.log('Getting the geo cords worked. Here is the lat and long:' , coordinates);
});


const coords = { latitude: '49.27670', longitude: '-123.13000' }
fetchISSFlyOverTimes(coords, (error, passTimes) => {
  if (error) {
    console.log("Getting the fly times didn't work" , error);
    return;
  }

  console.log('Getting the fly times worked', passTimes);
});



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
