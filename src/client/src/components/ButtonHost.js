
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import config from '../constants/config';
import routes from '../constants/routes';
import { buttonWasPressed } from '../actions/button';

class ButtonHost extends Component {
    constructor() {
        super();

        this.socket = new WebSocket(config.WS_API + "/buttons");
        this.socket.addEventListener('message', event => {
            const payload = JSON.parse(event.data);

            if(payload.buttonPressed){
                console.log(payload.buttonPressed + " was pressed");
                
                if(payload.buttonPressed === 'TOP')
                    this.props.push(routes.NOTIFICATIONS);
                else
                    this.props.buttonWasPressed(payload.buttonPressed);
            }
        });
    }

    render = () => null;
}

function mapStateToProps(state = {buttons: null}) {
    return {
      router: state.router
    };
  }

export default connect(
    mapStateToProps,
    { buttonWasPressed, push }
)(ButtonHost);