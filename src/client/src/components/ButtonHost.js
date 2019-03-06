
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import config from '../constants/config';
import routes from '../constants/routes';
import { buttonWasPressed } from '../actions/button';

class ButtonHost extends Component {
    componentDidMount() {
        const { push, buttonWasPressed } = this.props;

        this.socket = new WebSocket(config.WS_API + "/buttons");
        this.socket.addEventListener('message', event => {
            const payload = JSON.parse(event.data);

            if (payload.buttonPressed) {
                console.log(payload.buttonPressed + " was pressed");

                setTimeout(() => {
                    if (payload.buttonPressed === 'TOP')
                        push(routes.NOTIFICATIONS);
                    else
                        buttonWasPressed(payload.buttonPressed);
                });
            }
        });
    }

    render = () => null;
}

function mapStateToProps(state = { buttons: null }) {
    return {
        router: state.router
    };
}

export default connect(
    mapStateToProps,
    { buttonWasPressed, push }
)(ButtonHost);