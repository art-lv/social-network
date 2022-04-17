import React from 'react'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/images/1.png'
import style from './Users.module.css'





let Users = (props) => {



    // Поделив общее кол-во пользователей на то, сколько на каждой странице - мы получим кол-во страниц.
    // Но, нельзя забывать важный момент, если будет 19 пользователе, и на каждой странице по 5.
    // Должно быть 4 страницы, а 19 / 5 будет 3.8, поэтому обязательно полученный результат округляем в большую сторону, с помощью Math.ceil
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    // Это наши страницы - пустой массив
    let pages = []

    // Переберем общее кол-во страниц, и за каждую страницу запишем в массив (1, 2, 3...)
    // Сделаем i=1, так как страницы начинаются от 1 и сделаем <= вместо <
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }




    return (
        <div>





            {/* Рисуем нашу пагинацию */}
            <div className={style.navigation}>
                {
                    pages.map(p => {
                        // Если currentPage соответствует текущей странице, то присваиваем класс selectedPage, иначе присваиваем класс page
                        // Повесим событие клика, при клике вызываем вызываем метод onPageChanged и отдаем ему p
                        return <span key={p}
                            onClick={() => { props.onPageChanged(p) }}
                            className={props.currentPage === p ? style.selectedPage : style.page}
                        >{p}</span>
                    })
                }
            </div>




            {/* Рисуем пользователей */}
            {
                // Берем данные из пропсов, и перебираем этот массив
                props.users.map(
                    // Каждый пользователь, будет user и пускай он вернет 1 div
                    user => <div className={style.myUser} key={user.id}>

                        <div>
                            {/* Если наш user.photo.small не отсутствует, то берем его, в противном случае подставляем нашу картинку */}
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto} style={{ width: "100px" }} alt="" />
                            </NavLink>
                        </div>

                        <div>
                            {
                                user.followed
                                    ? <button className={style.button}
                                        // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции
                                        disabled={props.followingInProgress.some(id => id === user.id)}
                                        onClick={() => {

                                             /* Вызываем санк-креатор */
                                             props.unFollow(user.id)
                                    
                                        }}>Unfollow</button>

                                    : <button className={style.button}
                                        // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции
                                        disabled={props.followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                        
                                            /* Вызываем санк-креатор */
                                            props.follow(user.id)
                                        
                                        }}> Follow</button>
                            }
                        </div>
                        <div>
                            {user.name}
                        </div>
                        <div>
                            {user.status}
                        </div>

                    </div>
                )
            }




        </div>
    )
}

export default Users