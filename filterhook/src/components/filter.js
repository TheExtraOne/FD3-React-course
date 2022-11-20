import React, { useState, useCallback} from 'react';

import Controls from './controls';
import List from './list';
import './filter.css';
import {ArrContext} from "../context/arr-context";

const Filter = () => {
    const [vocabulary, setVocab] = useState( ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'] );

    function filterAlphabet(isChecked, str) {
        let newVoc = [...ArrContext._currentValue];
        if (isChecked) {
            newVoc.sort();
        }
        if (str !== '') {
            newVoc = newVoc.filter( item => item.includes(str) );
        }
        setVocab(newVoc);
    }
    
    const memoizedFilterAlphabet = useCallback( filterAlphabet, [] );

    //console.log('Filter component rendered');

    return (
        <>
            <Controls cbFilterAlphabet={memoizedFilterAlphabet}/>
            <ArrContext.Provider value = {vocabulary}>
                <List />
            </ArrContext.Provider>
        </>
    );
};

export default Filter;