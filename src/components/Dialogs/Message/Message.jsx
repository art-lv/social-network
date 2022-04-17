import style from './../Dialogs.module.css'

const Message = (props) => {
    return (
        <div className={style.message}>{props.text}</div>
    )
}

export default Message