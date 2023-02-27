const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`)
}

const fetchISSFlyOverTimes = function(body) {
  const lat = JSON.parse(body).latitude;
  const long = JSON.parse(body).longitude;
  const url = (`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${long}`);
  return request(url);
}

const printPassTimes = function(passTimes) {
  passTimes.forEach(item => {
    console.log(`Next pass at ${Date(item.risetime * 1000)} for ${item.duration} seconds!`);
  });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const response = JSON.parse(data);
    const passes = response.response;
    return printPassTimes(passes);
  })
}

module.exports = {
  nextISSTimesForMyLocation
}
