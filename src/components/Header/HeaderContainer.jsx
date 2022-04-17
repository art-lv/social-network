import React from "react"
import Header from "./Header"
import { connect } from "react-redux"
import { getAuthUserData, logout } from '../../redux/auth-reducer'



class HeaderContainer extends React.Component {


    componentDidMount() {
        //вызываем санк-креатор
        this.props.getAuthUserData()
    }

    render() {
        return (
            // Прокидываем все пропсы
            <Header {...this.props} logout={this.props.logout} />
        )
    }
}

const mapStateToProps = (state) => ({
    // Залогинены ли мы?
    isAuth: state.auth.isAuth,
    // Наш логин
    login: state.auth.login
})



/* let mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserData: (userId, email, login) => { 
            dispatch(setAuthUserData(userId, email, login))
        }
    }
}  */


export default connect(mapStateToProps, { getAuthUserData, logout })(HeaderContainer)