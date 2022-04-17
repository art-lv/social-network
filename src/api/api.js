import * as axios from 'axios'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7a1f42fc-2373-407e-91a4-ff2aa7db31e5'
    }
})


export const usersAPI = {
    // Получаем юзеров, на странице пользователей
    // page - номер активной страницы
    // count - сколько пользователей нужно нам получить от сервера
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            /* .then(response => {
                return (
                    response.data
                )
            }) */
            // Более короткая запись
            .then(response => response.data)
    },

    // Отписываемся от юзера, страница пользователей
    deleteUser(id) {
        return instance.delete(`follow/${id}`)

    },

    // Подписываемся на юзера, страница пользователей
    postUser(id) {
        return instance.post(`follow/${id}`, {})
    },

}


export const profileAPI = {
    // Получаем профиль, на странице профиля
    // Сделаем ajax запрос на сервак, и передадим ему номер страницы (pageNumber), по сути это просто число, на которое мы нажали.
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },

    // Получаем статус
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },
    // Изменяем статус
    updateStatus(status) {
        return instance.put(`/profile/status`, {
            status: status
        })
    }
}


export const authAPI = {
    // Получаем данные об авторазиции, в хедере
    // Сделаем ajax запрос на сервак, и передадим ему номер страницы (pageNumber), по сути это просто число, на которое мы нажали.
    getAuth() {
        return instance.get(`auth/me`)
    },

    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, {
            email, password, rememberMe
        })
    },

    logout() {
        return instance.delete(`/auth/login`)
    }

}