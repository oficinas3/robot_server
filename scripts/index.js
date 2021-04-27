const { node } = require('./ros_nodes.js');
const {
    startROS, getRent, endROS, getXY, deleteXY, pubGoTo,
} = require('./utils.js');

let isRented = false;
let publisher = null;

async function initPublisher() {
    publisher = await node();
    console.log('Ros listener running');
}
async function makeRequest() {
    const data = await getRent();

    if (data.state === 'RENTED' && !isRented) {
        startROS();
        // DO a post OK on cloud?
        console.log('Starting the robot');
        isRented = true;
    } else if (data.state === 'STANDY_BY' && isRented) {
        endROS();
        console.log('Finishing the robot rent');
        isRented = false;
    }

    if (data.islost === 1) {
        console.log('Robot is Lost');
        const goto = await getXY();
        let publishGoTo = true;
        if (goto) {
            // delete goto cloud
            await deleteXY();
            // publish to go to a point on map
            console.log(`Going to X: ${goto.point_x} Y : ${goto.point_y}`);
            if (publishGoTo) {
                pubGoTo(publisher, -5, 1);
                publishGoTo = false;
            }
        }
    }
}
initPublisher();
makeRequest();
f = setInterval(makeRequest, 1000);
