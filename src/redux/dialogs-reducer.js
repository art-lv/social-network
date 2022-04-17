// Вынесли типы для объекта action в отдельные константы
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

let initialState = {
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
    /* newMessageText: 'Новое сообщение из state.js', */
}





const dialogReducer = (state = initialState, action) => {



    // Если action.type равен
    switch (action.type) {


        // ADD_MESSAGE: то
        case ADD_MESSAGE: {

            // Скопировали то, что будем менять
            return {
                // Сделали поверхностную копию
                ...state,
                // Сделали глубокую копию, и в конце добавили новый объект, вместо push
                messageData: [...state.messageData, {
                    id: 4,
                    dataMessage: action.newMessageText
                }],
                /* // Обнулили сообщение
                newMessageText: '' */
            }

            /* // Создали новый объект с сообщением
            let newMessage = {
                id: 4,
                // newMessageText мы берем просто из state, так как при вводе каждого символа, мы его перезаписываем, так что мы просто создаем объект с теми данными которые у нас уже есть.
                dataMessage: state.newMessageText
            }
            // Запушили объект с сообщением
            stateCopy.messageData.push(newMessage)
            // Обнулили сообщение
            stateCopy.newMessageText = '' */

        }

        /* // UPDATE_NEW_MESSAGE: то
        case UPDATE_NEW_MESSAGE: {

            // Скопировали то, что будем менять
            return {
                ...state,
                // Обновили в state поле newMessageText на новый символ, newText пришел к нам из action - который мы в этом файле и подготовили, newText это просто переменная body
                newMessageText: action.newText,
            }
        } */


        // Ничего из этого: то
        default: {
            return state
        }

    }


}

// Домашнее задание
// action-creator, чтобы тупая компонента, не могла ошибиться создавая action
export let AddMessage = (newMessageText) => ({
    type: ADD_MESSAGE,
    newMessageText
})



/* export let UpdateNewMessage = body => ({
    type: UPDATE_NEW_MESSAGE,
    newText: body
}) */

export default dialogReducer