import style from './Login.module.css'
import { Redirect } from 'react-router-dom'
import { useForm } from "react-hook-form"


const Login = (props) => {



    // Вызываем данный хук, register - это name, handleSubmit - это метод при отправке формы, formState: { errors } - это валидация
    const { register, handleSubmit, formState: { errors } } = useForm()

    // Напишем редирект на страницу профиля, если мы уже авторизованы
    if (props.isAuth) return <Redirect to="/profile" />

    // Пишем свой обработчик, при отправке формы
    const onSubmit = data => {
        // Получим все собранные в форме данные
        console.log(data)
        // Вызываем санку, в которую нужно передать логин, пароль и запомнить ли меня
        props.login(data.login, data.password, data.rememberMe)
    }




    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

            <div className={style.formGroup}>
                <input className={style.formControl} placeholder='Логин' {...register("login", { required: true })} />
                
                {errors.login && <div className={style.helpBlock}>Введите логин</div>}
                <div>   dayassasin5@gmail.com</div>
            </div>

            <div className={style.formGroup}>
                <input className={style.formControl} placeholder='Пароль' {...register("password", { required: true })} />
                
                {errors.password && <div className={style.helpBlock}>Введите пароль</div>}
                <div>   12345</div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <input type="checkbox" {...register("rememberMe")} /> remember me
            </div>

            <div>
                <button type="submit">Login</button>
            </div>

        </form>
    )


}



export default Login