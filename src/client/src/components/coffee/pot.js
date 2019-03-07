import React, { Component } from 'react';

export default class Pot extends Component {
    defaults = {
        width: 190,
        height: 200,
        fill: 100
    }

    constructor(props) {
        super(props);

        this.baseImage = new Image();
        this.baseImage.src = '../resources/coffee-pot.png';
        this.baseImage.onload = this.redraw.bind(this);
    }

    redraw() {
        if(this.baseImage.complete !== true)
            return;

        const { width, height, fill } = { ...this.defaults, ...this.props };

        const coffeeLowerX = width * 0.325;
        const coffeeLowerY = height * 0.175;

        const coffeeMaxHeight = height * 0.275;
        const coffeeWidth = width * 0.46;
        const coffeeHeight = coffeeMaxHeight * (fill / 100);

        this.refs.canvas.width = width;
        this.refs.canvas.height = height;

        const ctx = this.refs.canvas.getContext('2d');

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = 'black';
        ctx.fillRect(coffeeLowerX, height - coffeeLowerY - coffeeHeight, coffeeWidth, coffeeHeight);

        ctx.drawImage(this.baseImage, 0, 0, this.baseImage.naturalHeight, this.baseImage.naturalWidth,0,0,width,height);
    }

    componentDidUpdate() {
        this.redraw();
    }

    componentDidMount() {
        this.redraw();
    }

    render = () => <canvas ref="canvas" />
}