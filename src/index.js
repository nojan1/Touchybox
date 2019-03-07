const led =  require('./notificationled');
const buttons = require('./buttons');

const request = require('request');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 4000

var expressWs = require('express-ws')(app);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/xkcd', (req, res) => {
    request('https://xkcd.com/info.0.json').pipe(res);
});

app.post('/notification', (req, res) => {
    led.addNotification(req.body);
    res.status(200).send();
});

app.delete('/notification/all', (req, res) => {
    led.clearNotifications();
    res.status(200).send();
});

app.delete('/notification/:id', (req, res) => {
    led.clearNotification(req.params.id);
    res.status(200).send();
});

app.ws('/buttons', (ws, reg) => {
    buttons.registerWebsocket(ws);
    ws.on('close', () => buttons.unregisterWebsocket(ws));
});

//TEST
app.post('/button/simulate', (req, res) => {
    buttons.simulateButton(req.body.name);
    res.status(200).send();
});
//

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);

    led.init();
    buttons.init();
});