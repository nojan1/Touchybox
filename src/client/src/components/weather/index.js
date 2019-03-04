
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Compass from './compass'

import styles from './weather.css';

class Weather extends Component {
  render() {
    const { weather } = this.props;

    if (Object.keys(weather).length > 0) {
      const today = weather[new Date().getDate()].predictions[0];

      return (<div className="flex">
        <div className="weather">
          <h2 className="topic">
            {today.temperature} C&deg; &nbsp;
                {today.humidity}% &nbsp;
                {today.pressure} hPa
            </h2>

          <div className="lowercontainer">
            <div>
              <img src={"../resources/weather/" + Math.ceil(today.cloudCover / 2) + "-" + today.precipitationType + ".png"} />
              <p>{today.precipitation} mm/h</p>
            </div>
            <div>
              <Compass direction={today.windDirection} height={90} />
              <p>{today.windSpeed} m/s</p>
            </div>
          </div>

        </div>
      </div>);
    } else {
      return <span />
    }
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather
  };
}

export default connect(
  mapStateToProps
)(Weather);