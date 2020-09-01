import produce from "immer";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


// Объявление констант - типов action
const SET_AUTH_USER = 'socia/auth-reducer/SET-AUTH-USER'; // тип action - задание данных авторизованного пользователя
const SET_CAPTCHA_URL = 'socia/auth-reducer/SET-CAPTCHA-URL'; // тип action - запись ссылки на каптчу в state
const INITIALIZED_SUCCESS = 'socia/auth-reducer/INITIALIZED-SUCCESS'; // тип action - успешное завершение
                                                                      // первичной инициализации приложения


// Задаем начальный state данного reducer
let initialState = {
    userId: null, // id авторизированного пользователя
    login: null, // логин авторизированного пользователя
    email: null, // e-mail авторизированного пользователя
    isAuth: false, // флаг, информирующий о том, выполнена ли (true) авторизация или нет (false)
    captchaURL: null, // ссылка на картинку - каптчу
    initialized: false // флаг, отвечающий за то, была ли произведена первичная инициализация
                       // приложения (true) или нет (false)
};


// Сама функция-reducer, обернутая в produce - функцию библиотеки immer, обеспечивающую иммутабельность state.
// Принимает черновую копию state и action
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
export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

// Action Creator задания авторизированного юзера в state
export const setAuthUser = (authData, isAuth) => {
    const {id, email, login} = authData;
    return {
        type: SET_AUTH_USER,
        isAuth: isAuth,
        id, email, login
    }
}

// Action Creator задание в state ссылки на каптчу
export const setCaptchaURL = (captchaURL) => {
    return {
        type: SET_CAPTCHA_URL,
        captchaURL
    }
}

// Thunk Creator певичной инициализации приложения
export const initializeApp = () => {
    return (async (dispatch) => {
        let initApp = await dispatch(setAuthUserData());
        dispatch(initializedSuccess(initApp));
    });
}

// Thunk Creator получения данных авторизированного пользователя
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


// Thunk Creator получения ссылки на каптчу
export const getCaptchaURL = () => {
    return (async (dispatch) => {
        let captchaURL = await authAPI.getCaptchaURL();
        dispatch(setCaptchaURL(captchaURL.url));
    });
}

export default authReducer;
