const axios = require('axios').default;
const { spawn } = require('child_process');

function sendMap(map) {
    console.log(`Sending ${map}`);
    axios.post('https://followyolo.herokuapp.com/save/map', { map });
}

function startROS() {
    const ros = spawn('roslaunch', ['cart_robot', 'my_world.launch']);
}

async function getRent() {
    let res = await axios.get('https://followyolo.herokuapp.com/robot/1');
    let data = res.data;
    return data;
}

module.exports = {
    getRent,
    sendMap,
    startROS,
};
