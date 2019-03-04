import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { connect } from 'react-redux'

class NotificationPage extends Component {
  renderNotifications(notifications){
    return (
      <ul>
        { Object.values(notifications).map(x => (
          <li key={x.id}>
            {x.text}
          </li>
        )) }
      </ul>
    );
  }

  render() {
    const { notifications } = this.props;

    return (<div>
        <Link to={routes.HOME} className="back-button">
            <i className="fa fa-arrow-left" />
          </Link>

        <h1 className="pull-left page-title">Notifications</h1>

        <a className="config-button">
          <i className="fas fa-eraser"></i>
        </a>

        <div className="clearfix"></div>

        { Object.keys(notifications).length > 0 ? this.renderNotifications(notifications) : <p>No notifications</p> }
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
