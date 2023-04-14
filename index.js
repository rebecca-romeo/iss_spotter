
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// Fetch ip address
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

// fetch geo cords
fetchCoordsByIP('99.225.184.241', (error, coordinates) => {
  if (error) {
    console.log("Getting the geo cords didn't work" , error);
    return;
  }

  console.log('Getting the geo cords worked. Here is the lat and long:' , coordinates);
});


// fetch flyover times
const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});