import {
    usersAPI
} from '../api/api'

// Вынесли типы для объекта action в отдельные константы
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWNING_PROGRESS = 'TOGGLE_IS_FOLLOWNING_PROGRESS'

// Отдаем изначальный state, нашему профилю
let initialState = {
    users: [],
    // Размер странички(Сколько юзеров будет на одной) - это постоянная величина, которую мы определяем сами
    pageSize: 5,
    // Сколько всего пользователей в системе, мы получим их с первым ajax запросом, когда зайдем на страницу пользователя (их 17799)
    // Поэтому ниже в редусере, я написал заглушку со строгим числом 50, тогда будет всего 10 страниц, и ничего не будет лагать.
    totalUsersCount: 0,
    // Текущая активная страница(Будем добавлять класс активности)
    currentPage: 1,
    // Есть ли прелоадер? Такие переменные c вопросом начинаются обычно с is
    isFetching: false,
    followingInProgress: []
}




// Изначально, state будет равен initialState
const usersReducer = (state = initialState, action) => {
    switch (action.type) {




        case FOLLOW: {
            // Вернем измененный state
            return {
                ...state,
                // Пробегаем по массиву данных users, и каждый элемент будет обозначаться как аргумент user
                users: state.users.map(user => {
                    // Если user.id из стейта, соответствует userId который мы передали в action через диспатч с компоненты в аргументе
                    if (user.id === action.userId) {
                        // Вернем копию user, так как сам user мы не можем менять, 
                        return {
                            ...user,
                            // и уже у копии поменяем статут false на true
                            followed: true
                        }
                    }
                    // Вернем нашего измененного юзера обратно в state
                    return user
                })
            }
        }


        case UNFOLLOW: {
            // Вернем измененный state
            return {
                ...state,
                // Пробегаем по массиву данных users, и каждый элемент будет обозначаться как аргумент user
                users: state.users.map(user => {
                    // Если user.id из стейта, соответствует userId который мы передали в action через диспатч с компоненты в аргументе
                    if (user.id === action.userId) {
                        // Вернем копию user, так как сам user мы не можем менять, 
                        return {
                            ...user,
                            // и уже у копии поменяем статут true на false
                            followed: false
                        }
                    }
                    // Вернем нашего измененного юзера обратно в state
                    return user
                })
            }
        }


        case SET_USERS: {

            // Вот, более простой синтаксис для понимания
            /* let stateCopy = {
                ...state,
                users: [...action.users]
            } 

            return stateCopy */

            return {
                // Возвращаем копию стейта
                ...state,

                // Возвращаем копию users, которые уже были и берем из action новых пользователей, которые пришли с сервака и дописываем их 
                // У димыча тут немного по другому, но тогда у меня возникает ошибка.
                // Лол в 55 выпуске 52 минута димыч исправил с сделал как у меня.
                // action.users это response.data.items
                users: action.users
            }
        }


        // Если SET_CURRENT_PAGE, то сменим класс активности у кнопки пагинации
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        // Передаем общее кол-во пользователей
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                // Пользователей 17799, поэтому напишу вместо этого числа, свою заглушку
                //totalUsersCount: action.count
                totalUsersCount: 50
            }
        }


        // Переключаем loader с false на true во время загрузки и наоборот
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }


        // Во время подписки и отписки
        case TOGGLE_IS_FOLLOWNING_PROGRESS: {
            return {
                ...state,

                followingInProgress: action.isFetching
                    // Если в action.isFetching передалось true - значит мы нажали, и нужно добавить id в массив, тем самым заблокировав кнопка
                    // Не понял ничего что тут написано
                    // Делаем глубокове копирование массива followingInProgress, и дописываем в конце id из action
                    ?
                    [...state.followingInProgress, action.userId]
                    // Если передалось false, нужно убрать этот id из state.
                    // filter - создает новый массив, со всеми элементами прошедшеми проверку. Т.Е. наш переданный id будет удален
                    :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }


        default: {
            return state
        }



    }
}


// Наши action-creator
export let followSuccess = (userId) => ({
    type: FOLLOW,
    userId
})
export let unFollowSuccess = (userId) => ({
    type: UNFOLLOW,
    userId
})
export let setUsers = (users) => ({
    type: SET_USERS,
    // Можно написать вот так
    // users: users
    // Если мы берем переменную из аргумента, то можно написать сокращенно вот так:
    users
})
// Переключение страницы
export let setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
// Общее кол-во пользователей
export let setTotalUsersCount = (count) => ({
    type: SET_TOTAL_USERS_COUNT,
    count
})
// Создание и выключение лоадера
export let toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

// Выключение кнопки, во время подписки и отписки
export let toggleIsfollowingInProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWNING_PROGRESS,
    isFetching,
    userId
})


// Импортируем thunk-creator

// Получание пользователей, на странице юзер-контейнер
export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        // Когда делаем запрос на сервер, перед этим показываем лоадер пользователям
        dispatch(toggleIsFetching(true))

        // Починил ошибку, с переключением активности у пагинации, димыч забыл вынести этот диспатч
        dispatch(setCurrentPage(currentPage))

        // Делаем ajax запрос на сервак, getUsers() вернет нам promise, и когда он вернется, сработает .then
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            // Когда пришел ответ, убираем лоадер
            dispatch(toggleIsFetching(false))
            // делаем диспатч (записываем пользователей)
            dispatch(setUsers(data.items))
            // делаем диспатч totalUsersCount (Общее кол-во пользователей, которое есть)
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}


// Подписка на странице юзеров
export const follow = (userId) => {
    return (dispatch) => {

        // Блокируем клик по кнопке
        dispatch(toggleIsfollowingInProgress(true, userId))
        // Делаем ajax запрос на подписку
        usersAPI.postUser(userId)
            .then(response => {
                // Если мы авторизованы
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                // Делаем кнопку кликабельной
                dispatch(toggleIsfollowingInProgress(false, userId))
            })

    }
}

// Подписка на странице юзеров
export const unFollow = (userId) => {
    return (dispatch) => {

        // Блокируем клик по кнопке
        dispatch(toggleIsfollowingInProgress(true, userId))
        // Делаем ajax запрос на удаление
        usersAPI.deleteUser(userId)
            .then(response => {
                // Если мы авторизованы
                if (response.data.resultCode === 0) {
                    dispatch(unFollowSuccess(userId))
                }
                // Делаем кнопку кликабельной
                dispatch(toggleIsfollowingInProgress(false, userId))
            })

    }
}


export default usersReducer