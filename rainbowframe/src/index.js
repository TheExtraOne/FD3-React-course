import React from 'react';
import ReactDOM from 'react-dom/client';

import RainbowFrame from './components/rainbow-frame';
import './index.css';

const colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RainbowFrame colors={colors} >
    Hello !
  </RainbowFrame>
);

