const rosnodejs = require('rosnodejs');
const axios = require('axios').default;

const stdMsgs = rosnodejs.require('std_msgs').msg;
const geoMsgs = rosnodejs.require('geometry_msgs').msg;
const { spawn } = require('child_process');
const { sendMap } = require('./utils.js');

function mapCallback(data) {
    rosnodejs.log.info('Received map ready message');
    const python = spawn('python3', ['scripts/pgm.py', 'encode']);
    python.stdout.on('data', (pythonData) => {
        const encodedMap = pythonData.toString();
        console.log(encodedMap);
        sendMap(encodedMap);
    });
    python.on('close', (code) => {
        console.log(`Python script finished with code ${code}`);
    });
}

function lostCallback(data) {
    console.log('Recebido mensagem de robo perdido');
    const flag = parseInt(data.data);
    axios.post('https://followyolo.herokuapp.com/robot/1/lost', { islost: flag });
}

function killCallback(data) {
    console.log('Recebido mensagem para matar processo do ROS');
    const kill = spawn('pkill', ['rosmaster']);
    kill.on('close', (code) => {
        console.log(`kill process exited with code ${code}`);
    });
}

async function node() {
    const rosNode = await rosnodejs.initNode('/web_client_node');
    rosNode.subscribe('/map_ready', stdMsgs.String, mapCallback);
    rosNode.subscribe('/lost', stdMsgs.String, lostCallback);
    rosNode.subscribe('/killme', stdMsgs.String, killCallback);

    const pub = rosNode.advertise('/govai', geoMsgs.Pose);
    return pub;
}

if (require.main === module) {
    node();
}

module.exports = {
    node,
};
