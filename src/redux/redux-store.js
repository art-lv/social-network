// Подключили библиотеку редакс
import {combineReducers, createStore, applyMiddleware} from 'redux'

// Импортим reducer
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
// Импортируем санку
import thunkMiddleware from 'redux-thunk'

import {reducer as formReducer} from 'redux-form'

// Вызовем функцию combineReducers из редакса, которая объеденит наши редусеры вместе
// profilePage, dialogsPage это как раз таки наш state, и мы по сути говорим, за эти страницы отвечают следующие редусеры.
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

// Создали наш объект store и отдали ему редусеры
let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

// Экспортировали его
export default store