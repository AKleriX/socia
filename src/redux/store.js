import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer as formReducer} from 'redux-form';
import thunk from "redux-thunk";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";



const reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer
});




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));




export default store;