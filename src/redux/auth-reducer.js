import {
    authAPI
} from "../api/api"

// Вынесли типы для объекта action в отдельные константы
const SET_USER_DATA = 'SET_USER_DATA'
const DELETE_USER_DATA = 'DELETE_USER_DATA'

// Отдаем изначальный state, нашему профилю
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

// Изначально, state будет равен initialState
const authReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_USER_DATA: {
            return {
                // Вернем измененный state
                ...state,

                //Вот так сделал димыч
                /* В action, будет объект data, с userId, email и login
                //...action.data, 
                isAuth: true */

                // А я сделаю вот так, более понятно для себя
                userId: action.data.userId,
                email: action.data.email,
                login: action.data.login,
                isAuth: true
            }

        }

        // Для выхода с сайта, вернем все пустые авторизованные данные
        case DELETE_USER_DATA: {
            return {
                ...state,
                userId: null,
                email: null,
                login: null,
                isAuth: false
            }
        }

        default: {
            return state
        }

    }
}


// Наши action-creator
export let setAuthUserData = (userId, email, login) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login
    }
})

export let deleteAuthUserData = () => ({
    type: DELETE_USER_DATA,
})

// Наши thunk-creator
// Получание данных об авторизации, на странице хедер контейнер
export const getAuthUserData = () => {
    return (dispatch) => {


        // Делаем ajax запрос, чтобы узнать, авторизованы ли мы
        authAPI.getAuth()
            .then(response => {
                
                // response.data.resultCode = 0 - значит мы авторизованы, 1 - не авторизованы
                if (response.data.resultCode === 0) {
                    // Вот так сделал димыч, но я сделал чуть-чуть по другому ниже
                    /* let {id, login, email} = response.data.data
                    dispatch(setAuthUserData(id, login, email)) */
                    // Отправляем в state объект, с нашими авторизационными данными
                    dispatch(setAuthUserData(response.data.data.id, response.data.data.email, response.data.data.login))

                }

                // Если мы не авторизованы, чтобы грамотно произошел выход, когда мы выходим с аккаунта, нужно задиспачить в state - то что мы вышли
                else {
                    dispatch(deleteAuthUserData())
                }

            })


    }
}



// Логин на сайте, на странице логина
export const login = (email, password, rememberMe) => {
    return (dispatch) => {

        // Делаем ajax porst запрос, с нашими данными, которые мы ввели при авторизации
        authAPI.login(email, password, rememberMe)
            .then(response => {
                // Если в ответе 0, значит мы ввели все верно и мы залогинены
                if (response.data.resultCode === 0) {

                    // Диспатчим опять санку, которая проверит, авторизованы ли мы на сайте (первый раз она срабатывает в хедере на всем сайте)
                    dispatch(getAuthUserData())

                }
            })

    }
}


// Выход с сайта, в хедере
export const logout = () => {
    return (dispatch) => {

        // Делаем ajax запрос на выход
        authAPI.logout()
            .then(response => {
                // Если в ответе есть 0, значит все ок, мы вышли



                if (response.data.resultCode === 0) {

                    // Диспатчим опять санку, которая проверит, авторизованы ли мы на сайте (первый раз она срабатывает в хедере на всем сайте)
                    // Мы будем уже не авторизованы, так что произойдет выход
                    dispatch(getAuthUserData())

                }
            })


    }
}




export default authReducer