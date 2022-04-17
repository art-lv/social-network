import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem'
import Message from './Message/Message'
import React from 'react'
import { useForm } from "react-hook-form"




const Dialogs = (props) => {


    // Вызываем данный хук, register - это name, handleSubmit - это метод при отправке формы, formState: { errors } - это валидация
    // setValue - функция, которая принимает 2 параметра, имя и значение, которое нужно вписать в инпут, именно это мы и используем для обнуления инпута
    const { register, handleSubmit, setValue } = useForm()

    // Пишем свой обработчик, при отправке формы
    const addMessage = (data) => {
        console.log(data)
        props.sendMessage(data.message)
        // Обнулим значение в инпуте
        setValue('message', '')
    }


    /* // Функция, добавления сообщения
    let addMessage = () => {
        // Вызываем ф-ю из контейнерной компоненты
        
    } */

    /* // Функция ввода текста, в наш инпут, по flux архитектуре
    let addMessageChange = (e) => {
        // Наша переменная, равняется текущему значению в текстареа
        let body = e.target.value
        // Вызываем ф-ю из контейнерной компоненты
        props.UpdateNewMessageBody(body)
    } */



    // Переберем данные с сервера методом .map, и сформируем из него такие вот компоненты, в которые передадим пропсы, которые будут текстом, урлами к картинам и т.д.
    let dialogsElements = props.dialogsData.map(
        dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
    )
    let messagesElements = props.messageData.map(
        item => <Message key={Math.random()} text={item.dataMessage} />
    )


    return (

        
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <form className={style.messages} onSubmit={handleSubmit(addMessage)}>
                {messagesElements}
                <input className={style.dialogsInput} {...register("message")}  /* value={props.newMessageText} */ />
                <button className={style.dialigsButton}>Отправить</button>
            </form>
        </div>
    )

}


export default Dialogs