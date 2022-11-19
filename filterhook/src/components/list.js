import React, { useContext } from 'react';

import './list.css';
import {ArrContext} from "../context/arr-context";

const List = () => {
    const currVoc = useContext(ArrContext).map( (item, index) => {
        return <p className='vocab__item' key={index}>{item}</p>
    });

    //console.log('List component rendered');

    return (
        <div className='vocab__list'>
            {currVoc}
        </div>
    );
};

export default List;