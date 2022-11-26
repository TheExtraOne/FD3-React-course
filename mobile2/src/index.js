import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import { store } from './redux/store';
import MobileCompany from "./components/mobile-company";

const capture = [
  {part:"Фамилия", code:1}, 
  {part:"Имя", code:2},
  {part:"Отчество", code:3},
  {part:"Баланс", code:4},
  {part:"Статус", code:5},
  {part:"Редактировать", code:6},
  {part:"Удалить", code:7}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MobileCompany 
      categoryNames={capture} />
  </Provider>

);


