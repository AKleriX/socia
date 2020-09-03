import loader from '../../../assets/images/pagesPreloader.svg';
import loginPreloader from '../../../assets/images/loginPreloader.svg';
import React from 'react';
import style from './Preloader.module.css';


/*Компонент, отображающий анимацию загрузки получения данных на странице*/
/* Component that displays animation of loading data retrieval on the page */
export const Preloader = () => {
    return (
        <img className={style.preloader} src={loader} alt={'Loading...'}/>
    );
}

/*Компонент, отображающий анимацию загрузки инициализации в Header*/
/*Component displaying initialization loading animation in Header*/
export const LoginPreloader = () => {
    return (
        <img className={style.loginPreloader} src={loginPreloader} alt={'Authorization...'}/>
    );
}