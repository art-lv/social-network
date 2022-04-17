import React from "react";
import { useForm } from "react-hook-form";
import style from './ReactForm.module.css'

const ReactForm = () => {

    // Вызываем данный хук, register - это name, handleSubmit - это метод при отправке формы, formState: { errors } - это валидация
    // setValue - функция, которая принимает 2 параметра, имя и значение, которое нужно вписать в инпут, именно это мы и используем для обнуления инпута
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    

    // Пишем свой обработчик, при отправке формы
    const onSubmit = data => {
        console.log(data)
        // Обнулим наши инпуты
        setValue('login', '')
        setValue('password', '')
    }


    // Register - это будем name наших инпутов
    // И также вешаем событие onSubmit, и передаем в хук handleSubmit нашу функцию, которая будет обрабатывать отправку формы
    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

            <div>Изучаю react-hook-form</div>

            <div className={style.formGroup}>

                {/* Укажем в качестве дефолтного значения логина, значение из хука defaultValue */}
                <input className={style.formControl} placeholder="Логин*" {...register("login", { required: true })} />
                {/* Ошибки будут возвращаться, когда проверка не пройдена  */}
                {errors.login && <span className={style.helpBlock}>Введите логин</span>}
            </div>


            <div className={style.formGroup}>
                <input className={style.formControl} placeholder="Пароль*" {...register("password", { required: true })} />
                {/* Ошибки будут возвращаться, когда проверка не пройдена  */}
                {errors.password && <span className={style.helpBlock}>Введите пароль</span>}
            </div>

            <div>
                <input type="checkbox" {...register("rememberMe")} />Запомнить меня
            </div>


            <div>
                <button type="submit">Отправить</button>
            </div>

        </form>
    )
}


export default ReactForm


