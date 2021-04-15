// Require rosnodejs itself
const rosnodejs = require('rosnodejs');
// Requires the std_msgs message package
const stdMsgs = rosnodejs.require('std_msgs').msg;
const { spawn } = require('child_process');
const { sendMap } = require('./send.js');

function listener() {
    // Register node with ROS master
    rosnodejs.initNode('/map_listener')
        .then((rosNode) => {
            // Create ROS subscriber on the 'chatter' topic expecting String messages
            const sub = rosNode.subscribe('/map_ready', stdMsgs.String,
                (data) => { // define callback execution
                    rosnodejs.log.info(`Received message. Map location [${data.data}]`);
                    const python = spawn('python3', ['scripts/pgm.py', 'encode']);
                    python.stdout.on('data', (python_data) => {
                        const encodedMap = python_data.toString();
                        sendMap(encodedMap);
                    });
                    python.on('close', (code) => {
                        console.log(`Python script finished with code ${code}`);
                    });
                    // sendMap(data.data);
                });
        });
}

if (require.main === module) {
    // Invoke Main Listener Function
    listener();
}

module.exports = {
    listener,
};
