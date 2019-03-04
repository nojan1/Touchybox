const ws281x = 
    process.arch === 'arm' && process.platform === 'linux'
        ? require('rpi-ws281x-native')
        : {
            init: (numLeds, options) => {
                console.log("Initiated ws281x using " + numLeds + " leds");
            },
            render: data => {
                console.log("Rendering led using data " + JSON.stringify(data));
            },
            reset: () => {}
        }

module.exports = {
    init: () => {
        ws281x.init(1, {
            frequency: 800000,
            dmaNum: 11,
            gpioPin: 12,
            invert: 0,
            brightness: 255
        });
    
        process.on('SIGINT', function () {
            ws281x.reset();
            process.nextTick(function () { process.exit(0); });
        });
    
        this.notifications = [];
        this.currentNotificationIndex = 0;
        this.handle = setInterval(update, 1000);
    },

    addNotification: (notification) => {
        this.notifications.push(notification);
    },

    clearNotification: (id) => {
        const notification = this.notifications.filter(x => x.id === id)
        if(notification.length === 0)
            return;

        const index = this.notifications.indexOf(notification);
        this.notifications = this.notifications.splice(index, 1);
    },

    clearNotifications: () => {
        this.notifications = [];
    }
}

const rgbhex2Int = (hex) => {
    if(hex.length < 6)
        return 0;

    if(hex[0] === '#')
        hex = hex.substring(1);

    return parseInt(hex, 16);
}

const rgb2Int = (r, g, b) => {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

const update = () => {
    const { notifications, currentNotificationIndex } = this;

    if(notifications.length === 0 || currentNotificationIndex > notifications.length - 1){
        ws281x.render([0]);
        this.currentNotificationIndex = 0;
    }else{
        const currentNotification = notifications[this.currentNotificationIndex++];
        const colorInt = rgbhex2Int(currentNotification.color);
        ws281x.render([colorInt]);
    }
}
