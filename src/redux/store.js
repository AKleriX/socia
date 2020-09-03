import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer as formReducer} from 'redux-form';
import thunk from "redux-thunk";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";


// Объединение всех редьюсеров
// Combine all reducers
const reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer
});



// Задание параметров для использования ReduxDevTools
// Set options for using Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Создание store с заданными редьюсеров и middleware
// Creating a store with specified reducers and middleware
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));




export default store;