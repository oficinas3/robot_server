const axios = require('axios').default;
const { spawn, exec } = require('child_process');

function sendMap(map) {
    console.log(`Sending ${map}`);
    axios.post('https://followyolo.herokuapp.com/save/map', { map });
}

function startROS() {
    const ros = spawn('roslaunch', ['cart_robot', 'global.launch']);
    ros.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    ros.stderr.on('data', (data) => {
        console.log(`${data}`);
    });
}

function endROS() {
    exec('pkill rosmaster', (error, stdout, stderr) => {
        console.log(stdout);
    });
}

async function getRent() {
    const res = await axios.get('https://followyolo.herokuapp.com/robot/1');
    const { data } = res;
    return data;
}

module.exports = {
    getRent,
    sendMap,
    startROS,
    endROS,
};
