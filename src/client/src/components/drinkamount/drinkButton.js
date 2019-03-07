
import React, { Component } from 'react';

const buttonStyle = {
    backgroundColor: 'transparent',
    padding: '5px',
    borderWidth: '2px'
}

const imageStyle = {

}

const DrinkButton = ({icon, onClick}) => 
    <button style={buttonStyle} onClick={onClick}>
        <img alt="icon" src={'../resources/' + icon + '.png'} style={imageStyle}/>
    </button>

export default DrinkButton