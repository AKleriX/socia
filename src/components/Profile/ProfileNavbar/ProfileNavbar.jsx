import React from "react";
import {NavLink} from "react-router-dom";
import style from './ProfileNavbar.module.css';

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