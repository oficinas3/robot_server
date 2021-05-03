const axios = require('axios').default;
const { spawn, exec } = require('child_process');
const rosnodejs = require('rosnodejs');

const geoMsgs = rosnodejs.require('geometry_msgs').msg;

function pubGoTo(publisher, x, y, z) {
    const msg = new geoMsgs.Pose();
    msg.position.x = x;
    msg.position.y = y;
    msg.position.z = z;
    console.log(`Publishing ${x} ${y} to goto`);
    publisher.publish(msg);
}

function sendMap(map) {
    console.log(`Sending map ${map}`);
    axios.post('https://followyolo.herokuapp.com/save/map', { map });
}

function startROS() {
    const roslaunch = spawn('roslaunch', ['followyollo_simulation', 'global.launch']);
    roslaunch.stdout.on('data', (data) => {
        console.log(`roslaunch data: ${data}`);
    });
    console.log('roslaunch iniciado');
}

function endROS() {
    const kill = spawn('pkill', ['rosmaster']);
    kill.on('close', (code) => {
        console.log(`kill process exited with code ${code}`);
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
