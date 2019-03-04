
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './xkcd.css';

class Xkcd extends Component {
  render() {
    const { xkcd } = this.props;

    if(xkcd && xkcd.img){
        return (<div className="full-height flex">
            <img src={xkcd.img} className="xkcdimage"/>
        </div>);
    }else{
        return <span />
    }
  }
}

function mapStateToProps(state = {xkcd: null}) {
    return {
      xkcd: state.xkcd
    };
  }

export default connect(
    mapStateToProps
)(Xkcd);