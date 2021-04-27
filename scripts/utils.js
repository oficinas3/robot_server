const axios = require('axios').default;
const { spawn, exec } = require('child_process');
const rosnodejs = require('rosnodejs');

const geoMsgs = rosnodejs.require('geometry_msgs').msg;

function pubGoTo(publisher, x, y) {
    const msg = new geoMsgs.Point();
    msg.x = x;
    msg.y = y;
    msg.z = 1;
    console.log(`Publishing ${x} ${y}`);
    publisher.publish(msg);
}

function sendMap(map) {
    console.log(`Sending map ${map}`);
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

async function getXY() {
    const res = await axios.get('https://followyolo.herokuapp.com/robot/1/goto');
    const { data } = res;
    return data;
}
async function deleteXY() {
    const res = await axios.delete('https://followyolo.herokuapp.com/robot/1/goto');
    const { data } = res;
    return data;
}
module.exports = {
    deleteXY,
    getXY,
    getRent,
    sendMap,
    startROS,
    endROS,
    pubGoTo,
};
