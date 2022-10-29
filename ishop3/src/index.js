import React from 'react';
import ReactDOM from 'react-dom/client';

import Shop from './components/shop';
import './index.css';

const shopName = "Sly fox'x book shop";
const booksArr = [
    {bookName:'Пикник на обочине', bookAuthor: 'А. и Б.Стругацкие', bookPrice: 15, bookURL:'./asserts/Picknick.jpg', howMuchLeft:1, code:1, control:'delete'},
    {bookName:'Краткая история человечества', bookAuthor:'Ю.Н.Харари', bookPrice:36, bookURL:'./asserts/HumanHistory.jpg', howMuchLeft:6, code:2, control:'delete'},
    {bookName:'Сфагнум', bookAuthor:'В.Мартинович', bookPrice:10, bookURL:'./asserts/Sphagnum.jpg', howMuchLeft:3, code:3, control:'delete'},
    {bookName:'Люди на болоте', bookAuthor:'И.Мележ', bookPrice:16, bookURL:'./asserts/Swump.jpg', howMuchLeft:8, code:4, control:'delete'},
    {bookName:'Мастер и Маргарита', bookAuthor:'М.Булгаков', bookPrice:25, bookURL:'./asserts/Master.jpg', howMuchLeft:1, code:5, control:'delete'},
    {bookName:'Аэропорт', bookAuthor:'А.Хейли', bookPrice:20, bookURL:'./asserts/Airport.jpg', howMuchLeft:45, code:6, control:'delete'},
    {bookName:'Тёмная Башня', bookAuthor:'С.Кинг', bookPrice:25, bookURL:'./asserts/DarkTower.jpg', howMuchLeft:14, code:7, control:'delete'},
];
const tableCaptures = [
    {part:'Название книги', code:1}, 
    {part:'Автор', code:2},
    {part:'Цена, руб.', code:3},
    {part:'Превью', code:4},
    {part:'Осталось на складе', code:5},
    {part:'Управление', code:6}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Shop 
        shopName={shopName}
        productsArr={booksArr}
        categoryNames={tableCaptures}
    />
);
