import React, { useRef } from 'react';

import './controls.css';

const Controls = ({cbFilterAlphabet}) => {
    const checkRef = useRef(null);
    const inputRef = useRef(null);

    //console.log('Controls component rendered');

    return(
        <>
            <input type='checkbox' ref={checkRef} onChange={()=> {cbFilterAlphabet(checkRef, inputRef)}} className='controls__checkbox'/>
            <input type='text' ref={inputRef} onChange={()=>{cbFilterAlphabet(checkRef, inputRef)}} className='controls__input'/>
            <button onClick={()=>{cbFilterAlphabet(checkRef, inputRef, true)}} className='controls__reset'>Сброс</button>
        </>
    );
};

export default Controls;