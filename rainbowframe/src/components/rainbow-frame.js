import React from 'react';
import PropTypes from 'prop-types';

import './rainbow-frame.css';

class RainbowFrame extends React.Component {
    
    state = {
        colors: this.props.colors.slice(0, this.props.colors.length-1),
        children: this.props.children
    };

    render() {
        if (this.props.colors.length > 1) {
            return (
                <div style={{border:"solid 10px "+ this.props.colors[this.props.colors.length - 1], padding:"10px"}}>
                    <RainbowFrame colors={this.state.colors} children={this.state.children}/>
                </div>
            );
        } else {
            return (
                <div style={{border:"solid 10px "+ this.props.colors[this.props.colors.length - 1], padding:"10px"}}>
                    {this.state.children}
                </div>
            );
        }
        
    }
}

export default RainbowFrame;