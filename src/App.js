import Sidebar from './components/Sidebar/Sidebar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import MyLocalState from './components/MyLocalState/MyLocalState'
import { Route } from 'react-router';
import ReactForm from './components/ReactForm/ReactForm';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/Users-container';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import Timer from './components/timer/Timer'
import Helmet from "react-helmet"






function App() {
    return (
        <div className="wrapper">


            <HeaderContainer />
            <div className="social_network">
                <Sidebar />
                <div className="main_content">
                    <Route exact path="/" component={ProfileContainer} />
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                    <Route path="/dialogs" render={() => <DialogsContainer  />} />
                    <Route path="/users" render={() => <UsersContainer />  } />
                    <Route path='/mylocalstate' component={MyLocalState} />
                    <Route path='/reactform' component={ReactForm} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/login' component={() => <LoginContainer />} />
                    <Route path='/timer' component={() => <Timer />} />
                </div>
            </div>
        </div>
    )
}

export default App;
