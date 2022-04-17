// Какая-то функция по умолчанию
import reportWebVitals from './reportWebVitals';
// Импортируем данные из store, чтобы отдать их функции, а также множество функций из state
//import store from './redux/store'
// Импортируем настоящий redux-store.
import store from './redux/redux-store'
// Импортируем реакт
import React from 'react';
import ReactDOM from 'react-dom';
// Импортируем стили
import './index.css';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';





ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}> 
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);



// Создание всего дом дерева, мы его обернули в функцию и перенесли в рендер js.
// При открытие сайта, рендерим весь контент.
// Мы как вызывающая сторона, должны наполнить данными state, эту функцию


//rerenderEntireTree()


// Вызвали функцию из state.js, и отдали ей в виде аргумента, функцию рендера контента
//store.subscribe(rerenderEntireTree)

// В настоящем редаксе нужно написать вот так, почему? я так и не понял
// В 47 уроке убираем
/* store.subscribe( () => {
    rerenderEntireTree()
}) */




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
