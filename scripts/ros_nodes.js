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
    axios.post('https://followyolo.herokuapp.com/robot/1/lost', { islost: 1 });
}

async function node() {
    const rosNode = await rosnodejs.initNode('/web_client_node');
    rosNode.subscribe('/map_ready', stdMsgs.String, mapCallback);
    rosNode.subscribe('/lost', stdMsgs.String, lostCallback);

    const pub = rosNode.advertise('/govai', geoMsgs.Point);
    return pub;
}

if (require.main === module) {
    node();
}

module.exports = {
    node,
};
