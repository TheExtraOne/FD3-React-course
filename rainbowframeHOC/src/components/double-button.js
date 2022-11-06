import React from 'react';

import './double-button.css';


class DoubleButton extends React.Component {

    render() {
        return (
            <div>
                <input className='double-button' type='button' value={this.props.caption1} onClick={this.props.cbPressed} />
                {this.props.children}
                <input className='double-button' type='button' value={this.props.caption2} onClick={this.props.cbPressed} />
            </div>
        )
        
    }
}

export default DoubleButton;