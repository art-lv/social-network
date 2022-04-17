import {
    profileAPI
} from "../api/api"

// Вынесли типы для объекта action в отдельные константы
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

// Отдаем изначальный state, нашему профилю
let initialState = {
    postData: [{
            id: 1,
            value: 'Пост 1',
            src: 'https://avatars.mds.yandex.net/get-ott/374297/2a000001616b87458162c9216ccd5144e94d/678x380',
            like: '0'
        },
        {
            id: 2,
            value: 'Пост 2',
            src: 'https://cdnimg.rg.ru/i/gallery/84f24d10/19_b6265e7a.jpg',
            like: '10'
        },
        {
            id: 3,
            value: 'Пост 3',
            src: 'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg',
            like: '3'
        },
    ],
    newPostText: 'Какой-то текст из данных',
    profile: null,
    status: ''
}






// Изначально, state будет равен initialState
const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST: {
            return {
                // Сделали поверхностную копию
                ...state,
                // Сделали глубокую копию, и в конце добавили новый объект, вместо push
                postData: [...state.postData, {
                    id: 5,
                    // Данные, будут постоянно меняться, оттого, что вводя каждый символ, мы обновляем эти данные вызовом функции updateNewPostText
                    value: state.newPostText,
                    src: 'https://upload.wikimedia.org/wikipedia/ru/4/4b/Avatar-2009.jpg',
                    like: 0
                }],
                // Обнулим наше value
                newPostText: ''
            }
        }

        case UPDATE_NEW_POST_TEXT: {
            // Вернем новый объект
            return {
                // Сделаем поверхностное копирование объекта state
                ...state,
                // Перезаписали в state поле newPostText на новый символ, newText пришел к нам из action - который мы в этом файле и подготовили, newText это просто переменная text
                newPostText: action.newText
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }


        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        default: {
            return state
        }

    }

}


// Наши action-creator
export let AddPostActionCreator = () => ({
    type: ADD_POST
})


export let AddPostChangeActionCreator = text => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})


export let setUserProfile = profile => ({
    type: SET_USER_PROFILE,
    profile
})


export let setStatus = status => ({
    type: SET_STATUS,
    status
})


// Наши thunk-creator
// Получание профиля, на странице профиль-контейнер
export const getProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(data => {
                // Запишем нового пользователя на страницу пользователя
                dispatch(setUserProfile(data))
            })
    }
}

// Получание статуса, на странице профиль-контейнер
export const updateStatus = (status) => {
    return (dispatch) => {
        // Делаем ajax запрос на изменение статуса, и передаем ему статус.
        profileAPI.updateStatus(status)
            .then(response => {
                // Если в ответе от сервера resultCode = 0, то все хорошо, ошибок нет.
                if (response.data.resultCode === 0) {
                    // Запишем статус на страницу пользователя
                    dispatch(setStatus(status))
                }
            })
    }
}

// Изменение статуса, на странице ...
export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(data => {
                // Запишем статус на страницу пользователя
                dispatch(setStatus(data))
            })
    }
}






export default profileReducer