import React from "react";
import {NavLink} from "react-router-dom";
import profileIcon from '../../../assets/images/user.svg';
import searchUsersIcon from '../../../assets/images/search.svg';
import LogoutIcon from '../../../assets/images/logout.svg';
import style from  './Navbar.module.css';


const Navbar = ({login, logout, userId}) => {
    return (
            <ul className={style.settingsArea}>
                <li>
                    <NavLink activeClassName={style.settingActive} to={'/users'}>
                        <img className={style.settingIcon} src={searchUsersIcon} alt={"Users"}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.settingActive} to={`/profile/${userId}/`}>
                        <img className={style.settingIcon} src={profileIcon} alt={"Profile"}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={style.userLogin} activeClassName={style.settingActive} to={`/profile/${userId}/`}>
                        {login}
                    </NavLink>
                </li>
                <li>
                    <img onClick={logout} className={style.settingIcon} src={LogoutIcon} alt={"Logout"}/>
                </li>
            </ul>
    );
}

export default Navbar;