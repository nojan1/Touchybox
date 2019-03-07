import React, { Component } from 'react';

import "./SlideDrawer.css";

export default class SlideDrawer extends Component {
    constructor(props) {
        super(props);

        this.currentComponentIndex = this.findInitialComponentIndex(props.initialSlide);
        this.state = {
            currentComponent: this.props.children[this.currentComponentIndex]
        };
    }

    findInitialComponentIndex(initialSlide) {
        if (!initialSlide)
            return 0;

        for (let i = 0; i < this.props.children.length; i++) {
            const child = this.props.children[i];
            const name = child.type.WrappedComponent 
                ? child.type.WrappedComponent.name
                : child.type.name

            if(name === initialSlide)
                return i;
        }

        return 0;
    }

    switch = (direction) => {
        this.currentComponentIndex += direction;

        if (this.currentComponentIndex > this.props.children.length - 1)
            this.currentComponentIndex = 0;
        else if (this.currentComponentIndex < 0)
            this.currentComponentIndex = this.props.children.length - 1;

        this.setState({
            currentComponent: this.props.children[this.currentComponentIndex]
        });
    }

    render = () => {
        return (<div className="slidedrawer">
            <div className="slidedrawer_side" onClick={this.switch.bind(this, -1)}>
                <i className="fas fa-arrow-left"> </i>
            </div>
            <div className="slidedrawer_container">
                <div className="slidedrawer_container_inner">
                    {this.state.currentComponent}
                </div>
            </div>
            <div className="slidedrawer_side" onClick={this.switch.bind(this, 1)}>
                <i className="fas fa-arrow-right"> </i>
            </div>
        </div>);
    }
}