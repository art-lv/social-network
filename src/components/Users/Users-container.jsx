import React from 'react'
import { connect } from 'react-redux'
// Импортим action-creator
import { getUsers, follow, unFollow} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/preloader/preloader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'


// Обязательно нужно написать extends к React.Component, таким образом мы говорим что наш класс, будет создан от родительского класса React.Component и получит все его свойства и методы.
class UsersContainer extends React.Component {


    // Это поведение класса по умолчанию, и это в целом можно и не писать.
    constructor(props) {
        super(props)
    }


    // componentDidMount() вызывается сразу после монтирования (то есть, вставки компонента в DOM). 
    // В этом методе должны происходить действия, которые требуют наличия DOM-узлов. Это хорошее место для создания сетевых запросов.
    componentDidMount() {
        // Все что было тут, вынесли в санки
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        /* this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUsersCount(data.totalCount)
        })  */

    }



    // Метод вызываемый при клике на номер страницы
    onPageChanged = (pageNumber) => {

        this.props.getUsers(pageNumber, this.props.pageSize)
        // Забыли сделать переключение активности пагинации
        // this.props.setCurrentPage(pageNumber) 


        /* // Когда делаем запрос на сервер, перед этим показываем лоадер пользователям
        this.props.toggleIsFetching(true)
        // Вырываем из контейнерной компоненты метод setCurrentPage и отдаем ему p (pageNumber) Диспатчим номер страницы
        this.props.setCurrentPage(pageNumber)

        // Сделаем ajax запрос на сервак, и передадим ему номер страницы (pageNumber), по сути это просто число, на которое мы нажали.
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                // Когда пришел ответ, убираем лоадер
                this.props.toggleIsFetching(false)
                // Вызовем функцию, из контейнера, которая в свою очередь вызывает диспатч
                // Запишем новых полученных юзеров в state, и они перерисовываются, с теми параметрами, которые мы передали, например (page=${2}&count=${5})
                this.props.setUsers(data.items)
            })   */

    }


    // Самое главное - определить данному классу render, так как по сути - смысл его в том, как и в функциональной - отрендерить какой-либо контент. Это по сути чистый рендер функциональной компоненты. Обязательно все props меняем на this.props, так как теперь они, часть объекта
    render() {
        // Отрисовываем презетнационную компоненту, и снабжаем ее данными и коллбеками для ее работы
        return (
            <div>

                {/* Рисуем лоадер */}
                {/* Тернарное выражение */}
                {this.props.isFetching ? <Preloader /> : null}

                <Users
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    followingInProgress={this.props.followingInProgress}

                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unFollow={this.props.unFollow} />
            </div>
        )
    }


}






// Дадим ей state (Тоже самое, что через пропсы)
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        followingInProgress: state.usersPage.followingInProgress,
        isFetching: state.usersPage.isFetching
    }
}

// Дадим ей коллбеки (Тоже самое, что через пропсы)
/* let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        // Передадим нашей контейнерной компоненте такой метод через пропсы
        // Он будет принимать номер страницы, и делать dispatch
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        // Передадим презентационной компоненте, функцию, с помощью которой она отдаст данные об общем кол-ве пользователей в state
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        },
        // Мы диспатчим санк-креатор - на самом деле action, но это не обычный action объект, а action- функция.
        getUsersThunkCreator: (currentPage, pageSize) => {
            dispatch(getUsersThunkCreator(currentPage, pageSize))
        }
    }
}  */



// Обернули нашу компоненту редиректом
// Обернули нашу классовую компоненту данными и коллбеками и отдали ее на экспорт
/* export default withAuthRedirect(connect(
    mapStateToProps,
    // Вместо mapDispatchToProps, положим сюда вот такой объект
    // Передадим также санкКреатор, как и action-creator
    {getUsers, follow, unFollow})(UsersContainer))

 */
export default compose(
    connect(mapStateToProps,{getUsers, follow, unFollow}),
    withAuthRedirect
)(UsersContainer)



