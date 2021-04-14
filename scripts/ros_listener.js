// Require rosnodejs itself
const rosnodejs = require('rosnodejs');
// Requires the std_msgs message package
const stdMsgs = rosnodejs.require('std_msgs').msg;

function listener() {
    // Register node with ROS master
    rosnodejs.initNode('/listener_node')
        .then((rosNode) => {
            // Create ROS subscriber on the 'chatter' topic expecting String messages
            const sub = rosNode.subscribe('/chatter', stdMsgs.String,
                (data) => { // define callback execution
                    rosnodejs.log.info(`I heard: [${data.data}]`);
                });
        });
}

if (require.main === module) {
    // Invoke Main Listener Function
    listener();
}
