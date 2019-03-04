import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { connect } from 'react-redux'

class NotificationPage extends Component {
  renderNotifications(notifications){
    return (
      <ul>
        { notifications.map(x => (
          <li>
            {x.text}
          </li>
        )) }
      </ul>
    );
  }

  render() {
    const { notifications } = this.props;

    return (<div>
        <Link to={routes.HOME} className="pull-left">
            <i className="fa fa-arrow-left" />
          </Link>

        <h1 className="pull-left">NotificationPage</h1>

        { notifications.length > 0 ? this.renderNotifications(notifications) : <p>No notifications</p> }
    </div>);
  }
}

function mapStateToProps(state = {notifications: []}) {
  return {
    notifications: state.notifications
  };
}

export default connect(
  mapStateToProps
)(NotificationPage);
