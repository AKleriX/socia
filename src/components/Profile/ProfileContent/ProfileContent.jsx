import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ProfileAbout from "./ProfileAbout/ProfileAbout";
import ProfileContacts from "./ProfileContacts/ProfileContacts";
import ProfileJob from "./ProfileJob/ProfileJob";
import ProfileEditPage from "../ProfileEditPage/ProfileEditPage";

const ProfileContent = ({profile, setProfileEditMode, editModeProfile, onEditFormSubmit, userIdInURL, authUserId}) => {
    return (
        <Switch>
            <Route exact path={`/profile/:userId?`}>
                <Redirect from={'/profile'} to={`/profile/${userIdInURL ? userIdInURL : authUserId}/about`}/>
            </Route>
            <Route path={`/profile/:userId/about`}
                   render={() => <ProfileAbout aboutMe={profile.aboutMe}/>}/>
            <Route path={`/profile/:userId/contacts`}
                   render={() => <ProfileContacts contacts={profile.contacts}/>}/>
            <Route path={`/profile/:userId/job`}
                   render={() => <ProfileJob lookingForAJob={profile.lookingForAJob}
                                             lookingForAJobDescription={profile.lookingForAJobDescription}/>}/>
            <Route path={`/profile/:userId/edit`}
                   render={() => <ProfileEditPage profile={profile} onEditFormSubmit={onEditFormSubmit}
                                                  editModeProfile={editModeProfile} setProfileEditMode={setProfileEditMode}/>}/>

        </Switch>
    );
}

export default ProfileContent;