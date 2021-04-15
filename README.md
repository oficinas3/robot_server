# robot_server
Code for the NodeJS server running on the robot.
# How to use
 1. Start ros master with roscore
 2. Start other nodes with rosrun/roslaunch
 3. Start the server with npm start
 
# Messages
The cloud server sends always json formatted requests. With one field 'message', that may contain more fields.

The messages to be exchanged with the server running on the cloud are:
1. Receive a message to start the robot
    * The cloud server sends a PUT request to the /start route on the robot
    * The message is the string "START RENT"
2. Receive a message when the rent is finished
    * The cloud server sends a PUT request to the /finish route on the robot
    * The message is the string "FINISH RENT"
3. Receive a message with the map file
    * The cloud server sends a PUT request to the /map route on the robot
    * The message is the .pgm image of the map encoded using base64 
4. Receive a message with coordinates to go
    * The cloud server sends a PUT request to the /goto route on the robot
    * The message is an object with "x" and "y" field, with the x and y coordinates, of the point the robot needs to go.
4. Send a message when the robot is lost
    * The robot server sends a PUT request to the /robot/lost route on the cloud
    * The message is the string "LOST"
5. Send a message with the map file
    * The robot server sends a PUT request to the /save/map route on the cloud
    * The message is the .pgm image of the map encoded using base64

The robot always return the string "OK" if request was successful or "FAILED" if not.
