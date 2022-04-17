import React from "react"
import { connect } from "react-redux"
import { login } from "../../redux/auth-reducer"
import Login from "./Login"


class LoginContainer extends React.Component {
    render() {
        return (
            <div>
                <Login login={this.props.login} isAuth={this.props.isAuth} />
            </div>
            
        )
    }
}


const mapStateToProps = (state) => ({
    // Залогинены ли мы?
    isAuth: state.auth.isAuth
})


// Передаем санку
export default connect(mapStateToProps, { login })(LoginContainer)