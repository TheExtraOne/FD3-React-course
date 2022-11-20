import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Br2 from './components/br2';


const text="первый<br>второй<br/>третий<br />последний";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Br2 text={text}/>
);



