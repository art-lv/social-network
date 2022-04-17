import style from './Login.module.css'
import { reduxForm } from 'redux-form'
import { Field } from 'redux-form'
import { Redirect } from 'react-router-dom'

// Заменим все инпуты, на другую компоненту field из редакс формы
const LoginForm = (props) => {
    return (
        <form className={style.form} onSubmit={props.handleSubmit}>

            <div className={style.formGroup}>
                <Field className={style.formControl} placeholder='Логин' name={"login"} component={"input"} />
                <span>   dayassasin5@gmail.com</span>   
            </div>


            <div className={style.formGroup}>
                <Field className={style.formControl} placeholder='Пароль' name={"password"} component={"input"} />
                <span>   12345</span>   
            </div>

            <div style={{marginTop: '20px'}}>
                <Field type="checkbox" name={"rememberMe"} component={"input"} /> remember me
            </div>

            <div>
                <button>Login</button>
            </div>

        </form>
    )
}

// Вызовем хок из редакс форм, и скажем, данная форма будет иметь уникальное имя логин, и скажем какую форму нужно обернуть в данный хок
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)


const LoginOld = (props) => {


    // Напишем редирект на страницу профиля, если мы уже авторизованы
    if (props.isAuth) return <Redirect to="/profile" />

    // При отправке формы, в консоль будут выводится данные из формы
    const onSubmit = (formData) => {
        // Получим все собранные в форме данные
        console.log(formData)
        // Вызываем санку, в которую нужно передать логин, пароль и запомнить ли меня
        props.login(formData.login, formData.password, formData.rememberMe)
    }


    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )

}

export default LoginOld