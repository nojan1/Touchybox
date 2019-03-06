const gpio =
    process.arch === 'arm' && process.platform === 'linux'
        ? require('rpi-gpio')
        : {
            setup: (pin, dir, edge) => { },
            on: (str, func) => { },
            setMode: (mode) => {},
        }

const BUTTON_TOP = 6;
const BUTTON_BOTTOM = 5;

const sendButtonPress = (sockets, button) => {
    sockets.forEach(sock => {
        if (sock.readyState === 1) {
            sock.send(JSON.stringify({
                buttonPressed: button
            }));
        }
    });
}

module.exports = {
    init: () => {
        this.webSockets = [];

        gpio.setMode(gpio.MODE_BCM);

        gpio.setup(BUTTON_TOP, gpio.DIR_IN, gpio.EDGE_FALLING);
        gpio.setup(BUTTON_BOTTOM, gpio.DIR_IN, gpio.EDGE_FALLING);

        gpio.on('change', (channel, value) => {
            switch (channel) {
                case BUTTON_TOP:
                    console.log('TOP button was pressed');
                    sendButtonPress(this.webSockets, 'TOP');
                    break;
                case BUTTON_BOTTOM:
                    console.log('BOTTOM button was pressed');
                    sendButtonPress(this.webSockets, 'BOTTOM');
                    break;
            }
        });
    },

    registerWebsocket: (ws) => {
        this.webSockets.push(ws);
    },

    unregisterWebsocket: (ws) => {

    },

    simulateButton: (name) => {
        sendButtonPress(this.webSockets, name);
    }
}