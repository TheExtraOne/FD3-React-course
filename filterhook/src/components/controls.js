import React, { useRef } from 'react';

import './controls.css';

const Controls = ({cbFilterAlphabet}) => {
    const checkRef = useRef(null);
    const inputRef = useRef(null);

    function reset() {
        checkRef.current.checked = false;
        inputRef.current.value = '';
    }
    //console.log('Controls component rendered');

    return (
        <>
            <input type='checkbox' ref={checkRef} onChange={()=> {cbFilterAlphabet(checkRef.current.checked, inputRef.current.value)}} className='controls__checkbox'/>
            <input type='text' ref={inputRef} onChange={()=>{cbFilterAlphabet(checkRef.current.checked, inputRef.current.value)}} className='controls__input'/>
            <button onClick={()=>{cbFilterAlphabet(false, ''); reset()}} className='controls__reset'>Сброс</button>
        </>
    );
};

export default Controls;