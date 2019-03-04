import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import routes from '../constants/routes';

import SlideDrawer from './SlideDrawer';
import Home from '../components/Home';
import Xkcd from '../components/xkcd';
import Quote from '../components/quote';
import Weather from '../components/weather';

import './MainPage.css';

class MainPage extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!this.props.buttons.pressedButton)
      return;

    if (prevProps.buttons.pressedButton !== this.buttons.pressedButton) {
        
    }
  }

  render() {
    return (<div className="full-height">
      <Link to={routes.CONFIG} className="config-button">
        <i className="fas fa-cog"></i>
      </Link>
 
      <SlideDrawer>
        <Home />
        <Quote />
        <Weather />
        <Xkcd />
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
