import formStyle from "../../common/FormsControls/FormsControls.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import React from "react";
import style from './ProfileEditPage.module.css';
import editIcon from "../../../assets/images/edit.svg";

/*Презентационный компонент формы редактирования профиля*/
/*Presentation component of the profile edit form*/
const ProfileEditForm = ({handleSubmit, profile, error, editModeProfile}) => {
    /*Если режим редактирования выключен - поня не доступны для редактирования, иначе - доступны*/
    /*If the editing mode is off, the concepts are not available for editing, otherwise, they are available*/
    const disabledControl = !editModeProfile ? 'disabled' : '';
    return (
        <form onSubmit={handleSubmit}>
            {editModeProfile &&
            <button disabled={disabledControl}>Save</button>
            }
            {
                error && <div className={formStyle.formSummaryError}>{error}</div>
            }
            <div>
                <b>Full Name</b>: {createField('Full name', 'fullName', [], Input, {disabled: disabledControl})}
            </div>
            <div>
                <b>About me</b>: {createField('About me', 'aboutMe', [], Textarea, {disabled: disabledControl})}
            </div>
            <div>
                <b>Contacts</b>: <ul>
                {Object.keys(profile.contacts).map(contact => {
                    return <li key={contact}>
                        <b>{contact}</b>: {createField(contact, 'contacts.' + contact, [], Input, {disabled: disabledControl})}
                    </li>
                })}
            </ul>
            </div>
            <div>
                <b>Looking for a job</b>: {createField('', 'lookingForAJob', [], Input, {
                type: 'checkbox',
                disabled: disabledControl
            })}
            </div>
            <div>
                <b>My professional skills</b>: {createField('My professional skills', 'lookingForAJobDescription',
                [], Textarea, {disabled: disabledControl})}
            </div>
        </form>
    );
}

/*Презентационный компонент страницы редактирования профиля*/
/*Presentation component of the profile edit page*/
const ProfileEditPage = ({profile, onEditFormSubmit, editModeProfile, setProfileEditMode}) => {
    return (
        <div className={style.tabPanel}>
            <div className={style.centralMeta}>
                <div className={style.pageName}>
                    <img alt={'edit'} src={editIcon}/>
                    &nbsp;Edit profile:
                </div>
                {!editModeProfile &&
                <button onClick={() => setProfileEditMode(true)}>Edit</button>
                }
                <ProfileEdit profile={profile} initialValues={profile}
                             onSubmit={onEditFormSubmit} editModeProfile={editModeProfile}/>
            </div>
        </div>
    );
}
/*Оборачивание формы редактирования в Redux-Form*/
/*Wrapping an edit form in Redux-Form*/
const ProfileEdit = reduxForm({form: 'edit-profile'})(ProfileEditForm);

export default ProfileEditPage;