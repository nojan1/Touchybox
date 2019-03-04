import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

export default class ConfigPage extends Component {
  render() {
    return (<div>
        <Link to={routes.HOME} className="pull-left">
            <i className="fa fa-arrow-left" />
          </Link>

        <h1 className="pull-left">Config</h1>
    </div>);
  }
}
