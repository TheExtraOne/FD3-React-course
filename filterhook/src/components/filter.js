import React, { useState, useCallback} from 'react';

import Controls from './controls';
import List from './list';
import './filter.css';
import {ArrContext} from "../context/arr-context";

const Filter = () => {
    const [vocabulary, setVocab] = useState( ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'] );

    function filterAlphabet(refCheck, refInput, reset=false) {
        if (!refCheck.current || !refInput.current) {
            return;
        }

        if (reset) {
            setVocab(vocabulary);
            refCheck.current.checked = false;
            refInput.current.value = '';
            return;
        }

        let newVoc = [...vocabulary];
        if (refCheck.current.checked) {
            newVoc.sort();
        }
        if (refInput.current.value !== '') {
            newVoc = newVoc.filter( item => item.includes(refInput.current.value) );
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