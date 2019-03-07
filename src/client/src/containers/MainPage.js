import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import routes from '../constants/routes';

import SlideDrawer from './SlideDrawer';
import Home from '../components/Home';
import Xkcd from '../components/xkcd';
import Quote from '../components/quote';
import Weather from '../components/weather';
import NotificationTest from '../components/notificationTest';
import Coffee from '../components/coffee';
import Drinkamount from '../components/drinkamount';

import './MainPage.css';

class MainPage extends Component {
  render() {
    return (<div className="full-height">
      <Link to={routes.CONFIG} className="config-button">
        <i className="fas fa-cog fa-lg"></i>
      </Link>
 
      <SlideDrawer initialSlide={this.props.match.params.slide}>
        <Home />
        <Quote />
        <Weather />
        <Xkcd />
        <NotificationTest />
        <Coffee />
        <Drinkamount />
      </SlideDrawer>
    </div>);
  }
}

function mapStateToProps(state = {buttons: null}) {
  return {
    buttons: state.buttons
  };
}

export default withRouter(connect(
  mapStateToProps
)(MainPage));
