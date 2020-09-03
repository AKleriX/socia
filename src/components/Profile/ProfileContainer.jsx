import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    getProfileData,
    getProfileStatus,
    setNewProfileData,
    setNewProfilePhoto,
    setNewProfileStatus, setProfileData, setProfileEditMode, setProfileStatus
} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {Preloader} from "../common/Preloader/Preloader";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import ProfileContent from "./ProfileContent/ProfileContent";
import style from './Profile.module.css';


/*Контейнерный компонент Profile, отрисока профиля пользователя*/
/*Profile container component, user profile rendering*/
const Profile = ({
                     profile, authUserId, status, editModeProfile,
                     getProfileData, getProfileStatus, setNewProfileStatus,
                     setNewProfilePhoto, setNewProfileData, setProfileData,
                     setProfileStatus, setProfileEditMode, ...props
                 }) => {


    /*Задаем bool параметр, характеризующий, является ли пользователь владельцем страницы или нет*/
    /*We set a bool parameter that characterizes whether the user is the owner of the page or not*/
    const isOwner = (!props.match.params.userId || (Number(props.match.params.userId) === authUserId));

    /*Функция обновления профиля, получающа userId, в случае его отсутствия в state
    и задающая в state данные нового пользователя*/
    /*A profile update function that receives userId if it is absent in state
     and setting the data of the new user in state*/
    const refreshProfile = () => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = authUserId;
            if (!userId) {
                props.history.push('/login');
                return;
            }
        }
        setProfileData(null);
        setProfileStatus(null);
        getProfileData(userId);
        getProfileStatus(userId);
    }

    /*Хуки для первичного обновления профиля и обновления после изменения userId в URL*/
    /*Hooks for initial profile update and update after changing userId in URL*/
    useEffect(refreshProfile, []);
    useEffect(refreshProfile, [props.match.params.userId]);

    /*Если нету профиля, то показываем загрузчик*/
    /*If there is no profile, then show the loader*/
    if (!profile)
        return <Preloader/>


    /*Функция обработки задания пользователем нового фото*/
    /*Function of processing a new photo task by the user*/
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length)
            setNewProfilePhoto(e.target.files[0]);
    }

    /*Функция отправки пользователем новых, отредактированных данных профиля*/
    /*Function for the user to send new, edited profile data*/
    const onEditFormSubmit = (formData) => {
        setNewProfileData(formData);
    }

    return (
        <section>
            <div className={style.profileContainer}>
                <div className={style.container}>
                    <div className={style.row}>
                        <div className={style.col}>
                            <div className={style.colContainer}>
                                <div className={style.userProfile}>
                                    <div className={style.profileSection}>
                                        <div className={style.profileSectionRow}>
                                            {/*Отрисовывам компонент ProfileHeader, передавая ему в
                                            пропсах необходимые функции и данные*/}
                                            {/*We draw the ProfileHeader component, passing it to
                                             props required functions and data*/}
                                            <ProfileHeader profile={profile} isOwner={isOwner}
                                                           onMainPhotoSelected={onMainPhotoSelected} status={status}
                                                           setNewProfileStatus={setNewProfileStatus}/>
                                            <div>
                                                {/*Отрисовывам компонент ProfileNavbar, передавая ему в
                                                пропсах необходимые функции и данные*/}
                                                {/*We draw the ProfileNavbar component, passing it to
                                                 props required functions and data*/}
                                                <ProfileNavbar profile={profile} isOwner={isOwner}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.profileContent}>
                                    <div>
                                        {/*Отрисовывываем контент страницы пользователя*/}
                                        {/*Rendering the content of the user's page*/}
                                        <ProfileContent profile={profile} setProfileEditMode={setProfileEditMode}
                                                        editModeProfile={editModeProfile}
                                                        onEditFormSubmit={onEditFormSubmit}
                                                        userIdInURL={props.match.params.userId}
                                                        authUserId={authUserId}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/*Получаем из state необходимые данные*/
const mapStateToProps = (state) => {
    return {
        authUserId: state.auth.userId,
        profile: state.profile.profile,
        status: state.profile.status,
        editModeProfile: state.profile.editModeProfile
    };
}

/*Подключаем контейнерный компонент к store и оборчаиваем хоком withRouter для получения парамтров из URL*/
export default compose(withRouter,
    connect(mapStateToProps, {
        getProfileData, getProfileStatus, setNewProfileStatus,
        setNewProfilePhoto, setNewProfileData,
        setProfileData, setProfileStatus, setProfileEditMode
    })
)(Profile);