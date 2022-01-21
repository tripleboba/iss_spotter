const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP: ${body}`;
      return callback(Error(msg), null);
    }

    const obj = JSON.parse(body);

    callback(null, obj.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, response, data) => {
    if (err) return callback(err, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP: ${ip}. Response: ${data}`;
      return callback(Error(msg), null);
    }

    const { latitude, longitude } = JSON.parse(data);
    return callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, data) => {
    if (err) {
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching flyOver time. Response: ${data}`;
      return callback(Error(msg), null);
    }
    const res = JSON.parse(data).response;
    callback(null, res);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) {
      console.log("It didn't work!", err);
      return;
    }
    //console.log('It worked! Returned IP:', ip);
  
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        console.log(`IP: ${ip} didn't work!`, err);
        return;
      }
      //console.log("The coordinates is", coords, "based on IP address:", ip, ".");
  
      fetchISSFlyOverTimes(coords, (err, data) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, data);
      })
    });
  });
}


module.exports = { 
  nextISSTimesForMyLocation
};