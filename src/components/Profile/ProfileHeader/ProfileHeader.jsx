import React from "react";
import userPhoto from "../../../assets/images/defaultUser.png";
import {NavLink} from "react-router-dom";
import ProfileStatus from "./ProfileStatus";
import style from './ProfileHeader.module.css';
import cameraIcon from '../../../assets/images/camera.png';

/*Компонент Header для профиля пользователя*/
/*Header component for user profile*/
const ProfileHeader = ({profile, isOwner, onMainPhotoSelected, status, setNewProfileStatus}) => {
    return (
        <div className={style.profileSectionCol}>
            <div className={style.profileAuthor}>
                <div className={style.profileAuthorThumb}>
                    {/*Отрисовка фото профиля, а если его нет - показываем изображение по умолчанию*/}
                    {/*Drawing a profile photo, and if it is not there, show the default image*/}
                    <img alt={'author'} src={profile.photos.large || userPhoto}/>
                    {/*Если пользователь является владельцем данного профиля,
                    то показываем кнопку смены фото профиля*/}
                    {/*If the user is the owner of this profile,
                     then we show the button to change the profile photo*/}
                    {isOwner && <div className={style.editDP}>
                        <label className={style.fileContainer}>
                            <img alt={'camera'} src={cameraIcon} className={style.cameraIcon}/>
                            <input type={'file'} onChange={onMainPhotoSelected}/>
                        </label>
                    </div>}
                    <div className={isOwner ? style.isOwnerAuthorContent : style.authorContent}>
                        <div className={style.authorName}>
                            {/*Отрисовка имени пользователя, которое является ссылкой на страницу профиля пользователя*/}
                            {/*Rendering the username, which is a link to the user profile page*/}
                            <NavLink to={`/profile/${profile.userId}/`}>
                                {profile.fullName}
                            </NavLink>
                        </div>
                        <div className={style.authorStatus}>
                            {/*Отрисовка компонента - статуса профиля*/}
                            {/*Rendering Component - Profile Status*/}
                            <ProfileStatus status={status} setNewProfileStatus={setNewProfileStatus} isOwner={isOwner}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;