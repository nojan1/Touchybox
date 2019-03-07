
import React, { Component } from 'react';
import * as moment from 'moment'; 
import { connect } from 'react-redux';
import { addDrink } from '../../actions/drinks';
import DrinkButton from './drinkButton';

import './drinkamount.css';

class Drinkamount extends Component {
    render() {
        const day = moment().format('Do MMMM');
        const { amount, caffeine } = this.props.drinks;

        return (
            <div className="full-height">
                <div className="buttonrow">
                    <DrinkButton icon="water-bottle" onClick={this.props.addDrink.bind(this, 'water-bottle')}/>
                    <DrinkButton icon="coffee-cup" onClick={this.props.addDrink.bind(this, 'coffee-cup')}/>
                    <DrinkButton icon="soda-can" onClick={this.props.addDrink.bind(this, 'soda-can')}/>
                </div>

                <h3>Data for {day}</h3>
                <p>Liquid: {amount} ml</p>
                <p>Caffeine: {caffeine} mg</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        drinks: state.drinks
    };
}

export default connect(
    mapStateToProps,
    { addDrink }
)(Drinkamount);