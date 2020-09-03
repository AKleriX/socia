import React from "react";
import {NavLink} from "react-router-dom";
import style from './ProfileNavbar.module.css';

/*Презентационный компонент панели навигации по профилю со ссылками на раные разделы самого профиля пользователя*/
/*The presentation component of the profile navigation bar with links to different sections of the user profile itself*/
const ProfileNavbar = ({profile, isOwner}) => {
    return (
        <div className={style.profileNavbarCol}>
            <ul className={style.profileNavbar}>
                <li className={style.profileNavbarItem}>
                    <NavLink activeClassName={style.activeLink} to={`/profile/${profile.userId}/about`}>
                        About
                    </NavLink>
                </li>
                <li className={style.profileNavbarItem}>
                    <NavLink activeClassName={style.activeLink} to={`/profile/${profile.userId}/contacts`}>
                        Contacts
                    </NavLink>
                </li>
                <li className={style.profileNavbarItem}>
                    <NavLink activeClassName={style.activeLink} to={`/profile/${profile.userId}/job`}>
                        Job
                    </NavLink>
                </li>
                {/*Если пользователь является владельцем профиля - показывать ссылку на раздел редактирования профиля*/}
                {/*If the user is the owner of the profile - show the link to the section for editing the profile*/}
                {isOwner && <li className={style.profileNavbarItem}>
                    <NavLink activeClassName={style.activeLink} to={`/profile/${profile.userId}/edit`}>
                        Edit
                    </NavLink>
                </li>}
            </ul>
        </div>
    );
}

export default ProfileNavbar;