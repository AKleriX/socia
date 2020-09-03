import produce from "immer";
import {updateObjectInArray} from "../utils/helpers";
import {followAPI, usersAPI} from "../api/api";

// Объявление констант - типов action
// Declaring constants - action types
const SET_TOTAL_USERS_COUNT = 'socia/users-reducer/SET-TOTAL-USERS-COUNT'; // тип action - задание в state общего числа пользователей
                                                                           // action type - setting the total number of users in state
const SET_USERS = 'socia/users-reducer/SET-USERS';// тип action - задание массива пользователей на странице
                                                  // action type - setting an array of users on the page
const FOLLOW_SUCCESS = 'socia/users-reducer/FOLLOW-SUCCESS';// тип action - успешного завершения подписки на пользователя
                                                            // action type - successful completion of the user subscription
const UNFOLLOW_SUCCESS = 'socia/users-reducer/UNFOLLOW-SUCCESS';// тип action - успешного завершения отписки от пользователя
                                                                // action type - successful completion of unsubscribing from the user
const TOGGLE_IS_FETCHING = 'socia/users-reducer/TOGGLE-IS-FETCHING'; // тип action - установка флага ожидания ответа от сервера по получению списка пользователей
                                                                     // action type - setting the flag of waiting for a response from the server to get a list of users
const TOGGLE_IS_FETCHING_PROGRESS = 'socia/users-reducer/TOGGLE-IS-FETCHING-PROGRESS'; // тип action - внесение id пользователя в список ожидающих ответа от сервера

// Задаем начальный state данного reducer
// Set the initial state of this reducer
let initialState = {
    users: [], // массив всех пользователей на странице
               // an array of all users on the page
    pageSize: 10, // количество пользователей на странице
                  // number of users on the page
    totalUsersCount: 0, // общее число пользователей
                        // total number of users
    isFetching: false, // флаг, характеризующий ожидание (true) ответа от сервера или его отсутствие (false)
                       // flag characterizing the expectation (true) of a response from the server or its absence (false)
    followingIsProgress: [] //список ud пользователей, для которых происходит ожидание подписки/отписки
                            // list of ud users for which subscription / unsubscription is pending
};

// Сама функция-reducer, обернутая в produce - функцию библиотеки immer, обеспечивающую иммутабельность state.
// Принимает черновую копию state и action

// The reducer function itself, wrapped in produce, is a function of the immer library that provides state immutability.
// Accepts a rough copy of state and action
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
// Action Creator tasks in the state of the total number of users totalUsersCount
export const setTotalUsersCount = (totalUsersCount) => {
    return (
        {
            type: SET_TOTAL_USERS_COUNT,
            totalUsersCount
        }
    );
}


// Action Creator задания в state списка пользователей на выбранной странице, где users - массив пользователей
// Action Creator tasks in the state of the list of users on the selected page, where users is an array of users
export const setUsers = (users) => {
    return (
        {
            type: SET_USERS,
            users
        }
    );
}

// Action Creator задания успешной подписки на пользователя с заданным id userId
// Action Creator of setting a successful subscription to the user with the given id userId
export const followSuccess = (userId) => {
    return (
        {
            type: FOLLOW_SUCCESS,
            userId
        }
    );
}

// Action Creator задания успешной отписки от пользователя с заданным id userId
// Action Creator task of successfully unsubscribing from the user with the given id userId
export const unfollowSuccess = (userId) => {
    return (
        {
            type: UNFOLLOW_SUCCESS,
            userId
        }
    );
}

// Action Creator задания флага ожидания получения списка пользователей, где isFetching - значение флага
// Action Creator setting the flag of waiting to get the list of users, where isFetching is the flag value
export const toggleIsFetching = (isFetching) => {
    return ({
        type:TOGGLE_IS_FETCHING,
        isFetching
    });
}

// Action Creator изменяющий состояние пользователя с заданным id userID
// по осуществлению на него подписки/отписки в зависимости от ожидания (true) или нет (false) ответа от сервера
// в соответствии с переданным значением isFetching

// Action Creator changing the state of the user with the given id userID
// to subscribe / unsubscribe to it, depending on the expectation (true) or no (false) response from the server
// according to the passed value isFetching
export const toggleIsFetchingProgress = (isFetching, userId) => {
    return ({
        type: TOGGLE_IS_FETCHING_PROGRESS,
        isFetching,
        userId
    });
}

// Thunk Creator осуществления подписки на пользователя с заданным id userId
// Thunk Creator to subscribe to the user with the given id userId
export const followUser = (userId) => {
    return (
        async (dispatch) => {
            await followUnfollowFlow(dispatch, userId, followAPI.follow.bind(followAPI), followSuccess);
        }
    );
}

// Thunk Creator осуществления отписки от пользователя с заданным id userId
// Thunk Creator to unsubscribe from the user with the given id userId
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

// A helper function that subscribes or unsubscribes from a user with a given id userId,
// receiving the store dispatch method, the apiMethod function that sends the request to the server and the actionCreator function,
// return the appropriate action
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

// Thunk Creator making a request and setting a new list of users depending on the page
// and the required number of users on it
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
