import React from "react";
import style from './ProfileAbout.module.css';
import aboutMeIcon from '../../../../assets/images/aboutMe.svg';

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