
import React, { Component } from 'react';
import * as moment from 'moment'; 
import { connect } from 'react-redux';
import DrinkButton from './drinkButton';

import './drinkamount.css';

class Drinkamount extends Component {
    constructor(props) {
        super(props);

        this.state = {liquid: 0, caffeine: 0};
    }

    addNutrition(amountLiquid, amountCaffeine) {
        this.setState({
            liquid: this.state.liquid + amountLiquid,
            caffeine: this.state.caffeine + amountCaffeine
        });
    }

    render() {
        const day = moment().format('Do MMMM');
        const { liquid, caffeine } = this.state;

        return (
            <div className="full-height">
                <div className="buttonrow">
                    <DrinkButton icon="water-bottle" onClick={this.addNutrition.bind(this, 600, 0)}/>
                    <DrinkButton icon="coffee-cup" onClick={this.addNutrition.bind(this, 200, 90)}/>
                    <DrinkButton icon="soda-can" onClick={this.addNutrition.bind(this, 330, 20)}/>
                </div>

                <h3>Data for {day}</h3>
                <p>Liquid: {liquid} ml</p>
                <p>Caffeine: {caffeine} mg</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps
)(Drinkamount);