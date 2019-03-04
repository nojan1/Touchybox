
import React, { Component } from 'react';
import * as moment from 'moment'; 
import './Home.css';

import { Link } from 'react-router-dom';
import routes from '../constants/routes';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = this.buildTimeState();
  }

  componentDidMount() {
    this.handle = setInterval(() => this.setState(this.buildTimeState()), 1000 * 30);
  }

  componentWillUnmount() {
    clearInterval(this.handle);
  }

  buildTimeState() {
    return {
      timestr: moment().format('HH:mm')
    }
  }

  render() {
    return (<div className="time-container">
      <h1 className="time">{this.state.timestr}</h1>
      <Link to={routes.NOTIFICATIONS}>NOTIFICATIONS</Link>
    </div>);
  }
}
