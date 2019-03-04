import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import MainPage from './containers/MainPage';
import ConfigPage from './containers/ConfigPage';
import NotificationPage from './containers/NotificationPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.NOTIFICATIONS} component={NotificationPage} />
      <Route path={routes.CONFIG} component={ConfigPage} />
      <Route path={routes.HOME} component={MainPage} />
    </Switch>
  </App>
);
