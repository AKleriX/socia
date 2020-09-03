import React from "react";
import logo from '../../assets/images/sociaLogoName.png';
import {NavLink} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import LoginIcon from '../../assets/images/login.svg';
import style from './Header.module.css';
import {LoginPreloader} from "../common/Preloader/Preloader";


/*Header компонент*/
/* Header component */
const Header = ({isAuth, login, logout,  initialized, userId}) => {
    return (
        <div className={style.header}>
            <div className={style.logoBox}>
                {/*Отрисовка логотипа приложения, клик по которому приводит к переходу на главную страницу*/}
                {/*Drawing the application logo, clicking on which leads to the transition to the main page*/}
                <NavLink to={'/'}>
                    <img className={style.logo} src={logo} alt={'Logo'}/>
                </NavLink>
            </div>
            {/*Если выполнена инициализация приложения, то смотрм, авторизовал ли пользователь.
            Если да - показваем Navbar.
            Иначе показываем кнопку Login*/}
            {/*If the application is initialized, then see if the user is authorized.
             If yes, show Navbar.
             Otherwise, show the Login button*/}
            {
                initialized ?
                    (isAuth ? <Navbar login={login} logout={logout} userId={userId}/> :
                    <NavLink activeClassName={style.loginActive} to={'/login'}>
                        <img className={style.loginIcon} src={LoginIcon} alt={'Login'}/>
                    </NavLink>) :
                    /*Если приложение не инициализированно, то показываем LoginPreloader*/
                    /*If the application is not initialized, then show the LoginPreloader*/
                    <LoginPreloader />

            }
        </div>
    );
}

export default Header;