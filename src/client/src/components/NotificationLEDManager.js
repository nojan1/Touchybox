
import React, { Component } from 'react';
import { connect } from 'react-redux';

// const ws281x = 
//     process.arch === 'arm' && process.platform === 'linux'
//         ? require('rpi-ws281x-native')
//         : {
//             init: (numLeds, options) => {}
//         }

//import * as ws281x from 'rpi-ws281x-native';

function rgxhex2Int(hex){
    if(hex.length < 6)
        return 0;

    if(hex[0] === '#')
        hex = hex.substring(1);

    return parseInt(hex, 16);
}

function rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

class NotificationLEDManager extends Component {
  componentDidMount() {
    if(process.arch === 'arm' && process.platform === 'linux'){
        import('rpi-ws281x-native').then(ws281 => {
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
        
            this.handle = setInterval(update, 1000);
        });
    }
  }

  componentWillUnmount(){
    clearInterval(this.handle);
  }    

  update(){
    const { notifications, currentNotificationIndex } = this.props;

    if(notifications.length === 0 || currentNotificationIndex > notifications.length - 1){
        ws281x.render([0]);
        this.props.currentNotificationIndex = 0;
    }else{
        const currentNotification = notifications[this.props.currentNotificationIndex++];
        const colorInt = rgbhex2Int(currentNotification.color);
        ws281x.render([colorInt]);
    }
  }

  render = () => null;
}

const mapStateToProps = (state = {notifications: []}) => 
    ({
        notifications: state.notifications,
        currentNotificationIndex: 0
    });

export default connect(
    mapStateToProps
)(NotificationLEDManager);