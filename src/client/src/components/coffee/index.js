
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pot from './pot';

class Coffee extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="full-height flex">
                <Pot fill={this.props.pots.left} />
                <Pot fill={this.props.pots.right} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    state = {...{pots: {left: 50, right: 30}}, ...state};
    return {
        pots: state.pots
    };
}

export default connect(
    mapStateToProps
)(Coffee);