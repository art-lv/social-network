import style from './ProfileInfo.module.css'
import Preloader from '../../common/preloader/preloader'
import userPhoto from '../../../assets/images/1.png'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {

    // Так как изначально, у нас нет никакого пользователя, то мы ждем пока пройдет ajax запрос, и мы получим его
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={style.ProfileInfo}>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            {/* <div>
                <img src="https://naked-science.ru/wp-content/uploads/2017/08/field_image_1_624.jpg" alt="" />
            </div> */}
            <img src={props.profile.photos.large ? props.profile.photos.large : userPhoto} alt="" />
            <p className={style.contactsData}>Имя: <span>{props.profile.fullName}</span></p>
            <p className={style.contactsData}>Обо мне: <span>{props.profile.aboutMe}</span></p>
            <div className={style.contactsData}>
                <p>Контактные данные:</p>
                <ul>
                    <li>
                        {props.profile.contacts.facebook}
                    </li>
                    <li>
                        {props.profile.contacts.website}
                    </li>
                    <li>
                        {props.profile.contacts.vk}
                    </li>
                    <li>
                        {props.profile.contacts.twitter}
                    </li>
                    <li>
                        {props.profile.contacts.instagram}
                    </li>
                    <li>
                        {props.profile.contacts.youtube}
                    </li>
                    <li>
                        {props.profile.contacts.github}
                    </li>
                    <li>
                        {props.profile.contacts.mainLink}
                    </li>
                </ul>
            </div>
            <p className={style.contactsData}>Ищу ли я работу?: <span>{props.profile.lookingForAJob ? 'Да' : 'Нет'}</span></p>
            <p className={style.contactsData}>Описание работы, которую Ищу: <span>{props.profile.lookingForAJobDescription}</span></p>
            <p className={style.contactsData}>id: <span>{props.profile.userId}</span></p>

            
        </div>
    )
}

export default ProfileInfo