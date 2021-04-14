const express = require('express');
// Constants
const PORT = 7777;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());

app.put('/start', (req, res) => {
    const msg = req.body.message;
    if (msg === 'START RENT') {
        res.send('OK');
    } else {
        res.send('FAILED');
    }
    console.log('Starting the robot');
});

app.put('/finish', (req, res) => {
    const msg = req.body.message;
    if (msg === 'FINISH RENT') {
        res.send('OK');
    } else {
        res.send('FAILED');
    }
    console.log('Finishing the robot rent');
});

app.put('/map', (req, res) => {
    const msg = req.body.message;
    if (msg === undefined) {
        res.send('FAILED');
    } else {
    // Fazer o decoding
        res.send('OK');
        console.log('Received map');
    }
});

app.put('/goto', (req, res) => {
    const point = req.body.message;
    const { x } = point;
    const { y } = point;
    if (x !== undefined && y !== undefined) {
        res.send('OK');
        console.log('Received coordinates.');
    } else {
        res.send('FAILED');
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
