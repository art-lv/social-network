import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './Profile.info/ProfileInfo';
import style from './Profile.module.css'



function Profile(props) {

    return (
        <div className={style.profile}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;