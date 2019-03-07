import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import routes from '../constants/routes';

import { loadQuote } from '../actions/quote';
import { loadXkcd } from '../actions/xkcd';
import { loadWeather } from '../actions/weather';
import { loadDrinks } from '../actions/drinks';

import ButtonHost from '../components/ButtonHost';
import MainPage from './MainPage';
import ConfigPage from './ConfigPage';
import NotificationPage from './NotificationPage';

const callAndSetupRefresh = (func, intervalSec) => {
  setInterval(func, intervalSec * 1000);
  func();
}

class Root extends Component{
  componentDidMount() {
    callAndSetupRefresh(this.props.loadQuote, 3600 * 2);
    callAndSetupRefresh(this.props.loadXkcd, 3600 * 2);
    callAndSetupRefresh(this.props.loadWeather, 3600 * 2);

    this.props.loadDrinks();
  }

  render() {
    return (<div className="full-height">
        <ButtonHost />
        <Switch>
          <Route path={routes.NOTIFICATIONS} component={NotificationPage} />
          <Route path={routes.CONFIG} component={ConfigPage} />
          <Route path={routes.HOME + ':slide?'} component={MainPage} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  null,
  { loadQuote, loadXkcd, loadWeather, loadDrinks }
)(Root)