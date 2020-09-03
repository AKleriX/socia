import React from "react";
import {Redirect} from "react-router";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import errorsStyle from '../common/FormsControls/FormsControls.module.css';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import style from './Login.module.css';
import cn from 'classnames';

/*Компонент, отрисовывающий форму логина, обернутую в ReduxForm*/
/*The component that renders the login form wrapped in ReduxForm*/
const Login = ({login, isAuth, captchaURL}) => {

    /*Функция обработки отправки заполненной формы логина*/
    /*Function to handle sending a completed login form*/
    const onSubmitLoginForm = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }


    /*Если выполнена авторизация - происходит переадисация на страницу профиля*/
    /*If authorization is performed, it is redirected to the profile page*/
    if (isAuth) {
        return (
            <Redirect to={'/profile'}/>
        );
    }

    return (
        <div className={style.centralMetaContainer}>
            <div className={style.centralMeta}>
            <h1 className={style.pageName}>Login</h1>
            <LoginFormContainer onSubmit={onSubmitLoginForm} captchaURL={captchaURL}/>
            </div>
        </div>
    );
}

/*Компонент формы логина*/
/*Login form component*/
const LoginForm = ({handleSubmit, error, captchaURL}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={style.loginInput}>
            {createField('Email', 'email', [required], Input)}
            </div>
            <div className={style.loginInput}>
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            </div>
            <div className={style.loginInput}>
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            </div>
            {captchaURL && <img src={captchaURL} alt={'captcha'}/>}
            {captchaURL &&
            <div className={style.loginInput}>
                {createField('Symbols from image', 'captcha', [required], Input)}
            </div>}
            {error && <div className={cn(errorsStyle.formSummaryError)}>
                {error}
            </div>}
            <div className={style.loginButton}>
                <button>Login</button>
            </div>
        </form>
    );
}

/*Оборачивание ReduxForm формы логина*/
/*Wrapping a ReduxForm login form*/
const LoginFormContainer = reduxForm({form: 'login'})(LoginForm);

/*Получение из state необходимых данных*/
/*Getting the necessary data from the state*/
const mapStateToProps = (state) => {
    return (
        {
            captchaURL: state.auth.captchaURL,
            isAuth: state.auth.isAuth
        }
    );

}

/*Подключение к store компонента логина*/
/*Connecting to the store of the login component*/
export default connect(mapStateToProps, {login})(Login);