import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux';



// Сделаем коннект, нашей компоненты к данным об авторизации


let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})





export const withAuthRedirect = (Component) => {

    // Если мы не авторизированы, сделаем редирект на страницу логина
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to="/login" />
            return <Component {...this.props} />
        }
    }

    // Присоеденим нашу компоненту, к данным об авторизации
    let connectedAuthRedirectContainer = connect(mapStateToPropsForRedirect)(RedirectComponent)

    // Вернем новую компоненту
    return connectedAuthRedirectContainer
    
}