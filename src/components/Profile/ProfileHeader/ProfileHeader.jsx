import React from "react";
import userPhoto from "../../../assets/images/defaultUser.png";
import {NavLink} from "react-router-dom";
import ProfileStatus from "./ProfileStatus";
import style from './ProfileHeader.module.css';
import cameraIcon from '../../../assets/images/camera.png';

const ProfileHeader = ({profile, isOwner, onMainPhotoSelected, status, setNewProfileStatus}) => {
    return (
        <div className={style.profileSectionCol}>
            <div className={style.profileAuthor}>
                <div className={style.profileAuthorThumb}>
                    <img alt={'author'} src={profile.photos.large || userPhoto}/>
                    {isOwner && <div className={style.editDP}>
                        <label className={style.fileContainer}>
                            <img alt={'camera'} src={cameraIcon} className={style.cameraIcon}/>
                            <input type={'file'} onChange={onMainPhotoSelected}/>
                        </label>
                    </div>}
                    <div className={isOwner ? style.isOwnerAuthorContent : style.authorContent}>
                        <div className={style.authorName}>
                            <NavLink to={`/profile/${profile.userId}/`}>
                                {profile.fullName}
                            </NavLink>
                        </div>
                        <div className={style.authorStatus}>
                            <ProfileStatus status={status} setNewProfileStatus={setNewProfileStatus} isOwner={isOwner}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;