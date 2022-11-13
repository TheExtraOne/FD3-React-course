import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import MobileCompany from "./components/mobile-company";

const clientsArr = [ 
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
  {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-220},
];
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
  <MobileCompany 
    clients={clientsArr}
    categoryNames={capture} />
);


