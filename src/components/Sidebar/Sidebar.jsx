import { NavLink } from 'react-router-dom';
import style from './Sidebar.module.css'

function Sidebar() {
    return (
        <div className={style.sidebar}>
            <NavLink to="/profile" activeClassName={style.active}>Профиль</NavLink>
            <NavLink to="/dialogs" activeClassName={style.active}>Сообщения</NavLink>
            <NavLink to="/users" activeClassName={style.active}>Пользователи</NavLink>
            <NavLink to="/mylocalstate" activeClassName={style.active}>Локальный стейт</NavLink>
            <NavLink to="/reactform" activeClassName={style.active}>Реакт хук форма</NavLink>
            <NavLink to="/settings" activeClassName={style.active}>Настройки</NavLink>
            <NavLink to="/timer" activeClassName={style.active}>Таймер</NavLink>
        </div>
    )
}

export default Sidebar;