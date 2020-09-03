import React from "react";
import style from './ProfileAbout.module.css';
import aboutMeIcon from '../../../../assets/images/aboutMe.svg';


/*Презентационная компонента about раздела профиля, отображающая информацию о пользователе*/
/*The about presentation component of the profile section, displaying information about the user*/
const ProfileAbout = ({aboutMe}) => {
    return (
        <div className={style.tabPanel}>
            <div className={style.centralMeta}>
                <div className={style.pageName}>
                    <img alt={'about me'} src={aboutMeIcon} />
                    &nbsp;About me:
                </div>
            <p>
                {aboutMe}
            </p>
            </div>
        </div>
    );
}

export default ProfileAbout;