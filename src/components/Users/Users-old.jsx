import React from 'react';
import * as axios from 'axios'
import userPhoto from '../../assets/images/1.png'

let Users = (props) => {



    // Служебная функция, которая сделает нашу презентационную компоненту чистой функцией
    // Повесим ее на событие onclick
    let getUsers = () => {

        // Если у нас нет пользоваталей, то отправим их
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
            /* props.setUsers(
                [
                    {
                        id: 1,
                        photoUrl: 'https://vjoy.cc/wp-content/uploads/2020/10/bezymyannyjav.jpg',
                        followed: false,
                        fullName: 'dmitry',
                        status: 'i am a boss',
                        location: {
                            city: 'minsk',
                            country: 'belarus'
                        }
                    },
                    {
                        id: 2,
                        photoUrl: 'https://vjoy.cc/wp-content/uploads/2020/10/bezymyannyjav.jpg',
                        followed: true,
                        fullName: 'tema',
                        status: 'i am a boss2',
                        location: {
                            city: 'voronej',
                            country: 'russia'
                        }
                    }
                ]
            ) */
        }

    }





    // Возвращаем 1 div
    return (
        <div>

            <button onClick={getUsers}>Получить пользователей</button>
            {
                // Берем данные из пропсов, и перебираем этот массив
                props.users.map(
                    // Каждый пользователь, будет user и пускай он вернет 1 div
                    user => <div key={user.id}>

                        <div>
                            {/* Если наш user.photo.small не отсутствует, то берем его, в противном случае подставляем нашу картинку */}
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} style={{ width: "100px" }} alt="" />
                        </div>

                        <div>
                            {
                                user.followed
                                    ? <button onClick={() => { props.unFollow(user.id) }}>Unfollow</button>
                                    : <button onClick={() => { props.follow(user.id) }}>Follow</button>
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
