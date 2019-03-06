
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNotification, clearNotifications } from '../actions/notifications';

class NotificationTest extends Component {
    addNotificationColor(color){
        this.props.addNotification({
            text: 'Test',
            color: color
        });
    }

    clearNotifications(){
        this.props.clearNotifications();
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.buttons.BOTTOM || prevProps.buttons.BOTTOM < this.props.buttons.BOTTOM){
            alert("Bottom was pressed");
        }
    }

    render() {
        const notifications = Object.values(this.props.notifications);
        return (
            <div>
                <p>There are {notifications.length} notifications</p>
                <ul>
                    <li>
                        <button type="button" onClick={this.clearNotifications.bind(this)}>Clear</button>
                    </li>
                    <li>
                        <button type="button" onClick={this.addNotificationColor.bind(this, '#d60808')}>Add red</button>
                    </li>
                    <li>
                        <button type="button" onClick={this.addNotificationColor.bind(this, '#0407c9')}>Add blue</button>
                    </li>
                    <li>
                        <button type="button" onClick={this.addNotificationColor.bind(this, '#08d60b')}>Add green</button>
                    </li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications,
        buttons: state.buttons
    };
}

export default connect(
    mapStateToProps,
    { addNotification, clearNotifications }
)(NotificationTest);