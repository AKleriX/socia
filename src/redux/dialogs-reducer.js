import produce from "immer";
import {dialogsAPI} from "../api/api";

// Объявление констант - типов action
// Declaring constants - action types
const SET_ALL_DIALOGS = 'socia/dialogs-reducer/SET-ALL-DIALOGS'; // тип action - задание списка всех диалогов
const SET_LIST_USER_MESSAGES = 'socia/dialogs-reducer/SET-LIST-USER-MESSAGES'; // тип action - задание всех сообщений пользователя
const SET_CHECK_MESSAGES = 'socia/dialogs-reducer/SET-CHECK-MESSAGES'; // тип action - задание проверенности просмотра сообщений
const SET_START_CHAT = 'socia/dialogs-reducer/SET0-TART-CHAT'; // тип action - задание начала диалога с пользователем

// Задаем начальный state данного reducer
// Set the initial state of this reducer
let initialState = {
    allDialogs: null, // список всех диалогов
    listUserMessages: null, // список всех сообщений пользователя
    userId: null, // userId пользователя, с которым идет диалог
    messagesCheckList: null, // проверка состояния просмотренности сообщения
    startChat: false // флаг - проверка начала диалога, false - диалог не начат, true - начат
};

// Сама функция-reducer, обернутая в produce - функцию библиотеки immer, обеспечивающую иммутабельность state.
// Принимает черновую копию state и action
// The reducer function itself, wrapped in produce, is a function of the immer library that provides state immutability.
// Accepts a rough copy of state and action
const dialogsReducer = produce((draft = initialState, action) => {
        switch (action.type) {
            case SET_ALL_DIALOGS: {
                draft.allDialogs = action.dialogs;
                break;
            }
            case SET_LIST_USER_MESSAGES: {
                draft.listUserMessages = action.userMessages;
                draft.userId = action.userId;
                break;
            }
            case SET_CHECK_MESSAGES: {
                draft.messagesCheckList = action.messagesCheckList;
                break;
            }
            case SET_START_CHAT: {
                draft.userId = action.userId;
                draft.startChat = true;
                break;
            }
            default:
                return draft;
        }
    }
);

// action creator - задание списка всех диалогов
export const setAllDialogs = (dialogs) => {
    return (
        {
            type: SET_ALL_DIALOGS,
            dialogs: dialogs
        }
    );
}

// action creator - задание списка всех сообщений с пользователем
export const setListUserMessage = (userMessages, userId) => {
    return (
        {
            type: SET_LIST_USER_MESSAGES,
            userMessages: userMessages,
            userId: userId
        }
    );
}

// action creator - задание проверки просмотренности сообщения
export const setCheckMessages = (checkMessages) => {
    return (
        {
            type: SET_CHECK_MESSAGES,
            messagesCheckList: checkMessages
        }
    );
}

// action creator - задание состояния начала диалога
export const setStartChat = (userId) => {
    return (
        {
            type: SET_START_CHAT,
            userId: userId
        }
    );
}

// thunk creator - получение всех диалогов
export const getAllDialogs = () => {
    return ( async (dispatch) => {
            let allDialogs = await dialogsAPI.getAllDialogs();
            console.log(allDialogs);
            if (allDialogs.resultCode === 0)
                dispatch(setAllDialogs(allDialogs));
        }
    );
}

// thunk creator - получение списка всех сообщений с пользователем по его userId
export const getMessageList = (userId) => {
    return(async (dispatch) => {
        let messages = dialogsAPI.getListOfMessages();
        console.log(messages);
        if (messages.resultCode === 0)
            dispatch(setListUserMessage(messages, userId));
    });
}

// thunk creator - получение состояния просмотренности сообщения по его messageId
export const getCheckMessages = (messageId) => {
    return(async (dispatch) => {
        let checkMessages = dialogsAPI.viewedMessage(messageId);
        console.log(checkMessages);
        if (checkMessages.resultCode === 0)
            dispatch(setCheckMessages(checkMessages));
    });
}

// thunk creator - начало диалога с пользователем по его userId
export const letStartChat = (userId) => {
    return(async (dispatch) => {
        let startChatCheck = dialogsAPI.startChatting(userId);
        console.log(startChatCheck);
        if (startChatCheck.resultCode === 0)
            dispatch(setStartChat(userId));
    })
}

export default dialogsReducer;