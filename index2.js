const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
 .then((passTimes) => {
   for (let timeObj of passTimes) {
     const datetime = new Date(0);
     datetime.setUTCSeconds(timeObj.risetime);
     console.log(`Next pass at ${datetime} for ${timeObj.duration} seconds!`);
   }
 })
 .catch((err) => {
   console.log("It didn't work: " + err.message);
 });