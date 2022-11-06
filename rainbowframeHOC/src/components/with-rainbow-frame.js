import React from 'react';

import './with-rainbow-frame.css';

let withRainbowFrame = colors => Comp => props => {
        let tag = <Comp {...props} />

        colors.forEach( color => tag = <div style={{border:"solid 10px "+ color, padding:"10px"}}>{tag}</div> );

        return (tag);
    }
;

export { withRainbowFrame };