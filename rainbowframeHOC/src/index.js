import React from 'react';
import ReactDOM from 'react-dom/client';

import DoubleButton from './components/double-button';
import { withRainbowFrame } from './components/with-rainbow-frame';
import './index.css';

const colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
const caption1 = 'У каждого';
const caption2 = 'Пятницу';

const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
      {/* <DoubleButton caption1={caption1} caption2={caption2} cbPressed={ eo => alert(eo.target.value) }> 
        из нас есть что-то от Робинзона... Мы все очень любим и ждем
      </DoubleButton> */}
      <FramedDoubleButton caption1={caption1} caption2={caption2} cbPressed={ eo => alert(eo.target.value) }> 
        из нас есть что-то от Робинзона... Мы все очень любим и ждем
      </FramedDoubleButton>
  </div>
);

