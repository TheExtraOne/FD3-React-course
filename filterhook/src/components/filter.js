import React, { useState} from 'react';

import Controls from './controls';
import List from './list';
import './filter.css';

const Filter = ({vocab}) => {
    const [vocabulary, setVocab] = useState( vocab );

    function filterAlphabet(isChecked, str) {
        let newVoc = [...vocab];
        if (isChecked) {
            newVoc.sort();
        }
        if (str !== '') {
            newVoc = newVoc.filter( item => item.includes(str) );
        }
        setVocab(newVoc);
    }

    //console.log('Filter component rendered');

    return (
        <>
            <Controls cbFilterAlphabet={filterAlphabet}/>
            <List filteredVoc={vocabulary}/>
        </>
    );
};

export default Filter;