import loader from '../../../assets/images/pagesPreloader.svg';
import loginPreloader from '../../../assets/images/loginPreloader.svg';
import React from 'react';
import style from './Preloader.module.css';

export const Preloader = () => {
    return (
        <img className={style.preloader} src={loader} alt={'Loading...'}/>
    );
}

export const LoginPreloader = () => {
    return (
        <img className={style.loginPreloader} src={loginPreloader} alt={'Authorization...'}/>
    );
}