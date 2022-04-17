// Импортим reducer
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'


let store = {
    // Наши данные
    _state: {
        profilePage: {
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
        },
        dialogsPage: {
            dialogsData: [{
                    id: 1,
                    name: 'Артем'
                },
                {
                    id: 2,
                    name: 'Игорь'
                },
                {
                    id: 3,
                    name: 'Сергей'
                },
                {
                    id: 4,
                    name: 'Дмитрий'
                },
                {
                    id: 5,
                    name: 'Ирина'
                },
            ],
            messageData: [{
                    id: 1,
                    dataMessage: 'Привет, как у тебя дела?'
                },
                {
                    id: 2,
                    dataMessage: 'Привет, хорошо, а у тебя?'
                },
                {
                    id: 3,
                    dataMessage: 'У меня тоже хорошо'
                },
            ],
            newMessageText: 'Новое сообщение из state.js',
        }
    },

    // ф-я рендера всего контента, но она пока не определена
    // После того как он определится, эта функция научится рендерить контент
    callSubscriber() {},

    // Так как у нас state, имеет нижнее подчеркивание, к нему по грамотному нельзя обращаться напрямую, поэтому напишем служебный метод, getState, который будет возвращать нам эти данные
    getState() {
        return this._state
    },

    // нам нужна функция перерисовки всего контента, но взять напрямую мы ее не можем.
    // Когда будет рендериться весь контент, то вызоветься в index.js функция subscribe, и observer это будут данные о функции рендера контента rerenderEntireTree. После чего мы говорим, теперь callSubscriber (наш, в стейте) равен observer (rerenderEntireTree в index.js)
    subscribe(observer) {
        this.callSubscriber = observer
    },



    dispatch(action) {
        // Вызываем reducer и отдаем ему нужную ему часть state, которую он может изменять, и action
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        // Перерисовываем страницу (Уведомляем подписчиков)
        this.callSubscriber(this._state)
    },

}




// Отдали по дефолту на экспорт store
export default store;
// Отдали store в глобальный мир (Можно вызвать в консоли браузера)
window.store = store