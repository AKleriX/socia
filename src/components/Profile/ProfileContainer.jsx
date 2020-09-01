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

const Profile = ({
                     profile, authUserId, status, editModeProfile,
                     getProfileData, getProfileStatus, setNewProfileStatus,
                     setNewProfilePhoto, setNewProfileData, setProfileData,
                     setProfileStatus, setProfileEditMode, ...props
                 }) => {


    const isOwner = (!props.match.params.userId || (Number(props.match.params.userId) === authUserId));

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

    useEffect(refreshProfile, []);
    useEffect(refreshProfile, [props.match.params.userId]);

    if (!profile)
        return <Preloader/>


    const onMainPhotoSelected = (e) => {
        if (e.target.files.length)
            setNewProfilePhoto(e.target.files[0]);
    }

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
                                            <ProfileHeader profile={profile} isOwner={isOwner}
                                                           onMainPhotoSelected={onMainPhotoSelected} status={status}
                                                           setNewProfileStatus={setNewProfileStatus}/>
                                            <div>
                                                <ProfileNavbar profile={profile} isOwner={isOwner}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.profileContent}>
                                    <div>
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

const mapStateToProps = (state) => {
    return {
        authUserId: state.auth.userId,
        profile: state.profile.profile,
        status: state.profile.status,
        editModeProfile: state.profile.editModeProfile
    };
}

export default compose(withRouter,
    connect(mapStateToProps, {
        getProfileData, getProfileStatus, setNewProfileStatus,
        setNewProfilePhoto, setNewProfileData,
        setProfileData, setProfileStatus, setProfileEditMode
    })
)(Profile);