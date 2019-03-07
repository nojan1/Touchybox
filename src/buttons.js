const gpio =
    process.arch === 'arm' && process.platform === 'linux'
        ? require('rpi-gpio')
        : {
            onChangeFunc: undefined,
            setup: (pin, dir, edge) => { },
            on: (str, func) => { 
                if(str === 'change'){
                    gpio.onChangeFunc = func;
                } 
            },
            setMode: (mode) => { },
        }

const DEBOUNCE = 100;
const BUTTONS = { 6: "TOP", 5: "BOTTOM" }

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
        this.lastPressed = Object.keys(BUTTONS).reduce((o, key) => ({ ...o, [key]: 0 }), {})

        gpio.setMode(gpio.MODE_BCM);

        Object.keys(BUTTONS).forEach(c =>
            gpio.setup(c, gpio.DIR_IN, gpio.EDGE_FALLING))

        gpio.on('change', (channel, _) => {
            if (BUTTONS[channel] && Date.now() - this.lastPressed[channel] > DEBOUNCE) {
                console.log(BUTTONS[channel] + ' button was pressed');

                this.lastPressed[channel] = Date.now();
                sendButtonPress(this.webSockets, BUTTONS[channel]);
            }
        });
    },

    registerWebsocket: (ws) => {
        this.webSockets.push(ws);
    },

    unregisterWebsocket: (ws) => {

    },

    simulateButton: (name) => {
        if(gpio.onChangeFunc){
            Object.keys(BUTTONS).forEach(k => {
                if(BUTTONS[k] === name){
                    gpio.onChangeFunc(k, true);
                }
            });
        }else{
            sendButtonPress(this.webSockets, name);
        }
    }
}