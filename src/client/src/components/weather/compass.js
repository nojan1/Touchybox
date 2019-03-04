import React, { Component } from 'react';

export default class Compass extends Component {
    render(){
        const {height, direction} = this.props;
        const offset = (height / 2) + 10;

        const needleStyle = {
            height: '80%',
            marginLeft: -offset,
            marginBottom: '5%',
            behavior: 'url(-ms-transform.htc)',
            MozTransform: 'rotate(' + direction+ 'deg)',
            WebkitTransform: 'rotate(' + direction + 'deg)',
            OTransform: 'rotate(' + direction + 'deg)',
            msTransform: 'rotate(' + direction + 'deg)'
        };

        return (
            <div style={{height: height}}>
                <img src="../resources/compass-background.png" style={{height: '100%'}}/>
                <img src="../resources/compass-needle.png" style={needleStyle}/>
            </div>
        );
    }
}