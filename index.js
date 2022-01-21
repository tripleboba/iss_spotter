
 const { nextISSTimesForMyLocation } = require('./iss');

 nextISSTimesForMyLocation((err, passTimes) => {
   if (err) {
     return console.log("It didn't work!", err);
   }
   for (let timeObj of passTimes) {
     const datetime = new Date(0);
     datetime.setUTCSeconds(timeObj.risetime);
     console.log(`Next pass at ${datetime} for ${timeObj.duration} seconds!`);
   }
 });