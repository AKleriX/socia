import produce from "immer";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


// Объявление констант - типов action
// Declaring constants - action types
const SET_AUTH_USER = 'socia/auth-reducer/SET-AUTH-USER'; // тип action - задание данных авторизованного пользователя
                                                          // action type - setting the data of the authorized user
const SET_CAPTCHA_URL = 'socia/auth-reducer/SET-CAPTCHA-URL'; // тип action - запись ссылки на каптчу в state
                                                              // action type - writing a link to the captcha in the state
const INITIALIZED_SUCCESS = 'socia/auth-reducer/INITIALIZED-SUCCESS'; // тип action - успешное завершение
                                                                      // первичной инициализации приложения
                                                                      // action type - successful completion
                                                                      // initial initialization of the application

// Задаем начальный state данного reducer
// Set the initial state of this reducer
let initialState = {
    userId: null, // id авторизированного пользователя  // id of the authorized user
    login: null, // логин авторизированного пользователя // login of the authorized user
    email: null, // e-mail авторизированного пользователя // e-mail of the authorized user
    isAuth: false, // флаг, информирующий о том, выполнена ли (true) авторизация или нет (false) // flag informing
                   // whether (true) authorization is completed or not (false)
    captchaURL: null, // ссылка на картинку - каптчу
                      // link to the image - captcha
    initialized: false // флаг, отвечающий за то, была ли произведена первичная инициализация
                       // приложения (true) или нет (false)
                       // flag responsible for whether initial initialization has been performed
                       // applications (true) or not (false)
};


// Сама функция-reducer, обернутая в produce - функцию библиотеки immer, обеспечивающую иммутабельность state.
// Принимает черновую копию state и action
// The reducer function itself, wrapped in produce, is a function of the immer library that provides state immutability.
// Accepts a rough copy of state and action
const authReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER: {
            [draft.email, draft.login, draft.userId, draft.isAuth] =
                [action.email, action.login, action.id, action.isAuth];
            break;
        }
        case SET_CAPTCHA_URL: {
            draft.captchaURL = action.captchaURL;
            break;
        }
        case INITIALIZED_SUCCESS: {
            draft.initialized = true;
            break;
        }
        default:
            return draft;
    }
});

// Action Creator успешного завершения первичной инициализации приложения
// Action Creator has successfully completed the initialization of the application
export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

// Action Creator задания авторизированного юзера в state
// Action Creator assigns an authorized user in state
export const setAuthUser = (authData, isAuth) => {
    const {id, email, login} = authData;
    return {
        type: SET_AUTH_USER,
        isAuth: isAuth,
        id, email, login
    }
}

// Action Creator задание в state ссылки на каптчу
// Action Creator task in the state of the link to the captcha
export const setCaptchaURL = (captchaURL) => {
    return {
        type: SET_CAPTCHA_URL,
        captchaURL
    }
}

// Thunk Creator первичной инициализации приложения
// Thunk Creator to sing initialize the application
export const initializeApp = () => {
    return (async (dispatch) => {
        let initApp = await dispatch(setAuthUserData());
        dispatch(initializedSuccess(initApp));
    });
}

// Thunk Creator получения данных авторизированного пользователя
// Thunk Creator to get the data of the authorized user
export const setAuthUserData = () => {
    return (async (dispatch) => {
            let userAuthData = await authAPI.getAuth();
            if (userAuthData.resultCode === 0)
                dispatch(setAuthUser(userAuthData.data, true));
        }
    );
}

// Thunk Creator логинизации. Получает данные из формы логина, отправляя их на сервер и,
// в случае корректных данных - выполняет авторизацию, иначе - выводит ошибку
// Thunk Creator login. Retrieves data from the login form by sending it to the server and,
// in case of correct data - performs authorization, otherwise - displays an error
export const login = (email, password, rememberMe, captcha) => {
    return (async (dispatch) => {
        let loginInfo = await authAPI.login(email, password, rememberMe, captcha);
        if (loginInfo.resultCode === 0) {
            dispatch(setAuthUserData());
        } else {
            if (loginInfo.resultCode === 10)
                dispatch(getCaptchaURL());
            let errorMessage = loginInfo.messages.length > 0 ? loginInfo.messages[0] : 'Sorry, there was some error';
            dispatch(stopSubmit('login', {_error: errorMessage}));
        }
    });
}


// Thunk Creator выхода из аккаунта. Отправляет запрос на сервер и задает не авторизированное состояние для state
// Thunk Creator log out. Sends a request to the server and sets the unauthorized state for state
export const logout = () => {
    return (async (dispatch) => {
        let logoutInfo = await authAPI.logout();
        if (logoutInfo.resultCode === 0)
            dispatch(setAuthUser({
                    id: null,
                    email: null,
                    login: null
                },
                false));
    });
}


// Thunk Creator получения ссылки на капчу
// Thunk Creator getting a link to a captcha
export const getCaptchaURL = () => {
    return (async (dispatch) => {
        let captchaURL = await authAPI.getCaptchaURL();
        dispatch(setCaptchaURL(captchaURL.url));
    });
}

export default authReducer;
