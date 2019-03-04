// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from '../Routes';

import { loadQuote } from '../actions/quote';
import { loadXkcd } from '../actions/xkcd';
import { loadWeather } from '../actions/weather';
import ButtonHost from '../components/ButtonHost';

// import NotificationLEDManager from '../components/NotificationLEDManager';
// import ButtonHost from '../components/ButtonHost';

const callAndSetupRefresh = (func, intervalSec) => {
  setInterval(func, intervalSec * 1000);
  func();
}

class Root extends Component{
  componentDidMount() {
    callAndSetupRefresh(this.props.loadQuote, 3600 * 2);
    callAndSetupRefresh(this.props.loadXkcd, 3600 * 2);
    callAndSetupRefresh(this.props.loadWeather, 3600 * 2);
  }

  render() {
    return (<div className="full-height">
        <ButtonHost />
        <Routes />
      </div>
    );
  }
}

export default connect(
  null,
  { loadQuote, loadXkcd, loadWeather }
)(Root)