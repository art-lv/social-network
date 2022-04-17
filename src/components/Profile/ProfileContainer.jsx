import Profile from './Profile';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfile, getStatus, updateStatus } from '../../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        // Получим id пользователя в адресной строке (За счет того, что ниже мы все обернули в withRouter)
        let userId = this.props.match.params.userId
        // Если его нет, значит мы на главной странице, захардкодим свой профиль
        if (!userId) {
            userId = 22927
        }
        // Вызываем санк-креатор, для получание данных профиля
        this.props.getProfile(userId)



        // Вызываем санк-креатор, для получание данных статуса, и передаем из урла id пользователя, статус которого мы хотим отобразить
        this.props.getStatus(userId)

    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }

}

// Вместо return, можно просто поставить круглую скобочку
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})


/* // Дадим ей коллбеки
let mapDispatchToProps = (dispatch) => {
    return {
        setUserProfile: (profile) => {
            dispatch(setUserProfile(profile))
        }
    }
}  */


/* // Обернем нашу компоненту, в наш созданный хок, который снабдит ее редиректом
let AuthRedirectContainer = withAuthRedirect(ProfileContainer)


// Обернем нашу компоненту, в другую контейнерную, с помощью метода withRouter
let withUrlDataContainerComponent = withRouter(AuthRedirectContainer)

// Обернем нашу комопненту, и передаем ей первым параметром state, а вторым action-creator
export default connect(mapStateToProps, { getProfile })(withUrlDataContainerComponent); */


export default compose(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)