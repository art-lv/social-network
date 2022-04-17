import { NavLink } from 'react-router-dom';
import style from './Header.module.css'
import logo from '../../assets/images/logo.png'

function Header(props) {
    return (
        <header className={` ${style.header} ${style.header_background}`}>
            <div className={style.container}>
                <img src={logo} alt="" />
                <div className={style.loginBlock}>
                    {/* Если мы залогинены, покажем наш логин, в противном случае, ссылку на логин */}

                    {props.isAuth ? <div>{props.login} <a href='#' onClick={props.logout}>Выход</a></div>  : <NavLink to='/login'>Login</NavLink>}
                </div>
            </div>
        </header>
    )
}

export default Header;