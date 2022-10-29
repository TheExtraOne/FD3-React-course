import React from 'react';
import ReactDOM from 'react-dom/client';

import Shop from './components/shop';
import './index.css';

const shopName = "Sly fox'x book shop";
const booksArr = require('./books.json');
const tableCaptures = require('./table-capture.json');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Shop 
        shopName={shopName}
        productsArr={booksArr}
        categoryNames={tableCaptures}
    />
);
