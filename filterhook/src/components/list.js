import React from 'react';

import './list.css';

const List = ({filteredVoc}) => {
    const currVoc = filteredVoc.map( (item, index) => {
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