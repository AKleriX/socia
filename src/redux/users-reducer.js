import produce from "immer";
import {updateObjectInArray} from "../utils/helpers";
import {followAPI, usersAPI} from "../api/api";

// Объявление констант - типов action
const SET_TOTAL_USERS_COUNT = 'socia/users-reducer/SET-TOTAL-USERS-COUNT'; // тип action - задание в state общего числа пользователей
const SET_USERS = 'socia/users-reducer/SET-USERS';// тип action - задание массива пользователей на странице
const FOLLOW_SUCCESS = 'socia/users-reducer/FOLLOW-SUCCESS';// тип action - успешного завершения подписки на пользователя
const UNFOLLOW_SUCCESS = 'socia/users-reducer/UNFOLLOW-SUCCESS';// тип action - успешного завершения отвиски от пользователя
const TOGGLE_IS_FETCHING = 'socia/users-reducer/TOGGLE-IS-FETCHING'; // тип action - установа флага ожидания ответа от сервера по получению списка пользователей
const TOGGLE_IS_FETCHING_PROGRESS = 'socia/users-reducer/TOGGLE-IS-FETCHING-PROGRESS'; // тип action - внесение id пользователя в список ожидающих ответа от сервера

// Задаем начальный state данного reducer
let initialState = {
    users: [], // массив всех пользователей на странице
    pageSize: 10, // количество пользователей на странице
    totalUsersCount: 0, // общее число пользователей
    isFetching: false, // флаг, характеризующий ожидание (true) ответа от сервера или его отсутствие (false)
    followingIsProgress: [] //список ud плользователей, для которых происходит ожидание подписки/отписки
};

// Сама функция-reducer, обернутая в produce - функцию библиотеки immer, обеспечивающую иммутабельность state.
// Принимает черновую копию state и action
const usersReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case SET_TOTAL_USERS_COUNT: {
            draft.totalUsersCount = action.totalUsersCount;
            break;
        }
        case SET_USERS: {
            draft.users = action.users;
            break;
        }
        case FOLLOW_SUCCESS: {
            draft.users =
                updateObjectInArray(draft.users, action.userId, 'id', {followed: true});
            break;
        }
        case UNFOLLOW_SUCCESS: {
            draft.users =
                updateObjectInArray(draft.users, action.userId, 'id', {followed: false});
            break;
        }
        case TOGGLE_IS_FETCHING: {
            draft.isFetching = action.isFetching;
            break;
        }
        case TOGGLE_IS_FETCHING_PROGRESS: {
            draft.followingIsProgress = action.isFetching ? [...draft.followingIsProgress, action.userId]
                : draft.followingIsProgress.filter(id => id !== action.userId);
            break;
        }
        default:
            return draft;
    }
});

// Action Creator задания в state общего числа пользователей totalUsersCount
export const setTotalUsersCount = (totalUsersCount) => {
    return (
        {
            type: SET_TOTAL_USERS_COUNT,
            totalUsersCount
        }
    );
}


// Action Creator задания в state списка пользователей на выбранной странице, где users - массив пользователей
export const setUsers = (users) => {
    return (
        {
            type: SET_USERS,
            users
        }
    );
}

// Action Creator задания успешной подписки на пользователя с заданным id userId
export const followSuccess = (userId) => {
    return (
        {
            type: FOLLOW_SUCCESS,
            userId
        }
    );
}

// Action Creator задания успешной отписки от пользователя с заданным id userId
export const unfollowSuccess = (userId) => {
    return (
        {
            type: UNFOLLOW_SUCCESS,
            userId
        }
    );
}

// Action Creator задания флага ожидания получения списка пользователей, где isFetching - значение флага
export const toggleIsFetching = (isFetching) => {
    return ({
        type:TOGGLE_IS_FETCHING,
        isFetching
    });
}

// Action Creator изменяющий состояние пользователя с заданным id userID
// по осуществлению на него подписки/отписки в зависимости от ожидания (true) или нет (false) ответа от сервера
// в соответствии с переданным значением isFetching
export const toggleIsFetchingProgress = (isFetching, userId) => {
    return ({
        type: TOGGLE_IS_FETCHING_PROGRESS,
        isFetching,
        userId
    });
}

// Thunk Creator осуществления подписки на пользователя с заданным id userId
export const followUser = (userId) => {
    return (
        async (dispatch) => {
            await followUnfollowFlow(dispatch, userId, followAPI.follow.bind(followAPI), followSuccess);
        }
    );
}

// Thunk Creator осуществления отписки от пользователя с заданным id userId
export const unfollowUser = (userId) => {
    return (
        async (dispatch) => {
            await followUnfollowFlow(dispatch, userId, followAPI.unfollow.bind(followAPI), unfollowSuccess);
        }
    );
}

// Вспомогательная функция осуществляющая подписку или отписку от пользователя с заданным id userId,
// получая метод store dispatch, функцию apiMethod, осуществляющую отправку запроса на сервер и функцию actionCreator,
// возвращающую соответствующий action
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFetchingProgress(true, userId));
    let followUnfollowInfo = await apiMethod(userId);
    if (followUnfollowInfo.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFetchingProgress(false, userId));
}


// Thunk Creator осуществления запрос и задание нового списка пользователей в зависимости от страницы
// и необходимого количества пользователей на ней
export const requestUsers = (page, pageSize,searchValue = '', friend = false) => {
    return(
        async (dispatch) => {
            dispatch(toggleIsFetching(true));
            dispatch(setUsers([]));

            let data = await usersAPI.getUsers(page, pageSize,searchValue, friend);
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        }
    );
}

export default usersReducer;
