import React from "react";
import logo from '../../assets/images/sociaLogoName.png';
import {NavLink} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import LoginIcon from '../../assets/images/login.svg';
import style from './Header.module.css';
import {LoginPreloader} from "../common/Preloader/Preloader";

const Header = ({isAuth, login, logout,  initialized, userId}) => {
    return (
        <div className={style.header}>
            <div className={style.logoBox}>
                <NavLink to={'/'}>
                    <img className={style.logo} src={logo} alt={'Logo'}/>
                </NavLink>
            </div>
            {
                initialized ?
                    (isAuth ? <Navbar login={login} logout={logout} userId={userId}/> :
                    <NavLink activeClassName={style.loginActive} to={'/login'}>
                        <img className={style.loginIcon} src={LoginIcon} alt={'Login'}/>
                    </NavLink>) :
                    <LoginPreloader />

            }
        </div>
    );
}

export default Header;