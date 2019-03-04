
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Quote extends Component {
  render() {
    const { quote } = this.props;

    if(quote.contents){
        const theQuote = quote.contents.quotes[0];

        return (<div>   
            <p>
                {theQuote.quote}
            </p>
            <i>
                {theQuote.author}
            </i>
        </div>);
    }else{
        return <span />
    }
  }
}

function mapStateToProps(state) {
    return {
      quote: state.quote
    };
  }

export default connect(
    mapStateToProps
)(Quote);