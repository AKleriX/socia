import produce from "immer";
import {authAPI, profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";


// Объявление констант - типов action
// Declaring constants - action types
const SET_PROFILE_DATA = 'socia/profile-reducer/SET-PROFILE-DATA'; // тип action - задание в state данных данных текущего профиля
                                                                   // action type - setting the data of the current profile in the state
const SET_PROFILE_STATUS = 'socia/profile-reducer/SET-PROFILE-STATUS'; // тип action - задание в state статуса текущего профиля
                                                                       // action type - setting the state of the current profile
const SET_PROFILE_EDIT_MODE = 'socia/profile-reducer/SET-PROFILE-EDIT-MODE'; // тип action - изменение (включение/выключение) режима редактирования Data профиля
                                                                             // action type - change (enable / disable) the Data profile editing mode
const SET_PROFILE_PHOTO = 'socia/profile-reducer/SET-PROFILE-PHOTO'; // тип action - задание новой фотографии профиля
                                                                     // action type - setting a new profile photo

// Задаем начальный state данного reducer
// Set the initial state of this reducer
let initialState = {
    profile: null, // объект с данными и фото профиля // object with data and profile photo
    status: null, // status текущего профиля // status of the current profile
    editModeProfile: false // флаг, информирующий о включении (true) и выключении (false) режима редактирования профиля
                           // flag informing about enabling (true) and disabling (false) the profile editing mode
};

// Сама функция-reducer, обернутая в produce - функцию библиотеки immer, обеспечивающую иммутабельность state.
// Принимает черновую копию state и action
// The reducer function itself, wrapped in produce, is a function of the immer library that provides state immutability.
// Accepts a rough copy of state and action
const profileReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA: {
            draft.profile = action.profile;
            break;
        }
        case SET_PROFILE_STATUS: {
            draft.status = action.status;
            break;
        }
        case SET_PROFILE_EDIT_MODE: {
            draft.editModeProfile = action.editMode;
            break;
        }
        case SET_PROFILE_PHOTO: {
            draft.profile.photos = action.photos;
            break;
        }
        default:
            return draft;
    }
});

// Action Creator задания данных текущего профиля
// Action Creator set current profile data
export const setProfileData = (profile) => {
    return (
        {
            type: SET_PROFILE_DATA,
            profile
        }
    );
}

// Action Creator задание статуса текущего профиля
// Action Creator set the status of the current profile
export const setProfileStatus = (status) => {
    return (
        {
            type: SET_PROFILE_STATUS,
            status
        }
    );
}

// Action Creator переключение режима редактирования профиля
// Action Creator switch profile edit mode
export const setProfileEditMode = (editMode) => {
    return (
        {
            type: SET_PROFILE_EDIT_MODE,
            editMode
        }
    );
}

// Action Creator задание фотографии профиля
// Action Creator set a profile photo
export const setProfilePhoto = (photos) => {
    return (
        {
            type: SET_PROFILE_PHOTO,
            photos
        }
    );
}

// Thunk Creator получения данный профиля с заданным userId
// Thunk Creator get the given profile with the given userId
export const getProfileData = (userId) => {
    return (async (dispatch) => {
        if (!userId) {
            let authUserData = await authAPI.getAuth();
            if (authUserData.resultCode === 0)
                userId = authUserData.data.id;
        }
        let profileData = await profileAPI.getProfileData(userId);
        dispatch(setProfileData(profileData));
    });
}

// Thunk Creator получение status профиля с заданным userId
// Thunk Creator get the status profile with the given userId
export const getProfileStatus = (userId) => {
    return (async (dispatch) => {
        if (!userId) {
            let authUserData = await authAPI.getAuth();
            if (authUserData.resultCode === 0)
                userId = authUserData.data.id;
        }
        let profileStatus = await profileAPI.getProfileStatus(userId);
        dispatch(setProfileStatus(profileStatus));
    });
}

// Thunk Creator задание нового status профиля с statusText
// Thunk Creator set a new status profile with statusText
export const setNewProfileStatus = (statusText) => {
    return (async (dispatch) => {
        await setNewStatusOrPhotoFlow(dispatch, statusText, profileAPI.setProfileStatus.bind(profileAPI),
            setProfileStatus, statusText);
    });
}

// Thunk Creator задания новой фотографии профиля, пришедшей в виде файла photoFile
// Thunk Creator setting a new profile photo, which came in the form of a file photoFile
export const setNewProfilePhoto = (photoFile) => {
    return (async (dispatch) => {
        await setNewStatusOrPhotoFlow(dispatch, photoFile, profileAPI.setProfilePhoto.bind(profileAPI),
            setProfilePhoto);
    });
}

// Вспомогательная функция для задания нового статуса или новой фотографии профиля, принимающей метод store dispatch,
// необходимую для отправки на сервер data, функцию apiMethod, осуществляющую отправку данных серверу, функцию actionCreator, возвращающую необходимый action,
// и объект forAction, в котором могут содержаться данные, необходимые для actionCreator (если null - задаем фото в качестве аргумента actionCreator)

// Helper function for setting a new status or new profile photo, accepting a store dispatch method,
// required to send data to the server, the apiMethod function, which sends data to the server, the actionCreator function, which returns the required action,
// and an object forAction, which can contain data required for the actionCreator (if null, set the photo as an argument to actionCreator)
const setNewStatusOrPhotoFlow = async (dispatch, data, apiMethod, actionCreator, forAction = null) => {
    let response = await apiMethod(data);
    if (response.resultCode === 0) {
        if (forAction === null)
            forAction = response.data.photos;
        dispatch(actionCreator(forAction));
    }
}

// Thunk Creator задания новых данных для профиля с проверкой серверной валидации и
// отлавливания ошибок в полях формы редактирования,
// данные которой приходят в объекте profileData, сформированного redux-form

// Thunk Creator set new profile data with server validation check and
// catch errors in edit form fields,
// whose data comes in the profileData object generated by redux-form
export const setNewProfileData = (profileData) => {
    return (async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await profileAPI.setProfileData(profileData);
        if (response.resultCode === 0){
            dispatch(getProfileData(userId));
            dispatch(setProfileEditMode(false));
        } else {
            let messages = {};
            response.messages.forEach(m => {
               let startErrorFieldName = m.indexOf('>') + 1;
               let endErrorFieldName = m.indexOf(')');
               let errorName = m.slice(startErrorFieldName, endErrorFieldName);
               messages[errorName.toLowerCase()] = m;
            });
            dispatch(stopSubmit('edit-profile', {'contacts': {...messages}}));
            dispatch(setProfileEditMode(true));
        }
    });
}

export default profileReducer;