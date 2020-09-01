import React from "react";
import style from './ProfileJob.module.css';
import jobIcon from '../../../../assets/images/skills.svg';
import cn from 'classnames';

const ProfileJob = ({lookingForAJob, lookingForAJobDescription}) => {
    return (
        <div className={style.tabPanel}>
            <div className={style.centralMeta}>
                <div className={style.pageName}>
                    <img src={jobIcon} alt={'Job'}/>
                    &nbsp;Job:
                </div>
                {lookingForAJob ?
                    <div>
                        <p>
                            I am looking for a yob!
                        </p>
                        <div className={cn(style.pageName, style.altPageName)}>
                            &nbsp;My skills:
                        </div>
                        <p>
                            {lookingForAJobDescription}
                        </p>
                    </div> :
                    <div>
                        <p>
                            I am <b>NOT</b> looking for a job!
                        </p>
                    </div>}
            </div>
        </div>
    );
}

export default ProfileJob;