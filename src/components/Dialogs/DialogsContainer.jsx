import { AddMessage } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect }  from '../../hoc/withAuthRedirect'
import { compose } from 'redux'





// Дадим ей state (Тоже самое, что через пропсы)
let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messageData: state.dialogsPage.messageData,
        /* newMessageText: state.dialogsPage.newMessageText, */
    }
}

// Дадим ей коллбеки (Тоже самое, что через пропсы)
let mapDispatchToProps = (dispatch) => {
    return {
        /* UpdateNewMessageBody: (body) => {
            // body - это каждый вводимый нами символ
            // UpdateNewMessage это функция из редусера
            dispatch(UpdateNewMessage(body))
        }, */
        sendMessage: (newMessageText) => {
            // Вызываем функцию бизнес уровня 
            // AddMessage это функция из редусера
            dispatch(AddMessage(newMessageText))
        },
    }
}






/* // Обернем нашу компоненту, в наш созданный хок, который снабдит ее редиректом
let AuthRedirectContainer = withAuthRedirect(Dialogs)

// Функция, которая обернет нашу презентационную компоненту Dialogs и даст ей в пропсах state и коллбеки, которые ей нужны
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectContainer)
 */


export default 
// Заимпортим из редакса функцию compose
// Второй вызов - это вызов той функции, которую возвращает первый вызов
// Таким вот образом, очень удобно обернем нашу компоненту dialogs всеми необходимыми хоками
compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)