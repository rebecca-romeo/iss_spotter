// index.js
const { nextISSTimesForMyLocation } = require('./iss');





nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // console.log(passTimes);

  // success, print out the deets!
  passTimes.forEach(item => {
    console.log(`Next pass at ${Date(item.risetime * 1000)} for ${item.duration} seconds!`);
  });
});
