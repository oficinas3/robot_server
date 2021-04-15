const axios = require('axios').default;

function sendMap(map) {
    console.log(`Sending ${map}`);
    axios.post('https://followyolo.herokuapp.com/save/map', { map });
}

module.exports = {
    sendMap,
};
