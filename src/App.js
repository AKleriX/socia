import React, {useEffect} from 'react';
import './App.css';
import {connect} from "react-redux";
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {initializeApp} from "./redux/auth-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import NoPageError from "./components/NoPageError/NoPageError";

const App = ({initializeApp, initialized}) => {

    {/*Задаем хук для первичной инициализации приложения, авторизации и
    получения данных авторизированного пользователя*/}
    {/*We set a hook for the initial initialization of the application,
    authorization and receiving data of an authorized user*/}
    useEffect(() => {
        initializeApp()
    });

    return (
        <HashRouter>
            {/*Для реализации перехода между страницами оборачиваем компоненты в Router*/}
            {/*To implement the transition between pages, wrap components in Router*/}
            {/*Отрисовка компоненты-header*/}
            {/*Rendering the header component*/}
            <HeaderContainer/>
            {/*Если произведена инициализация приложения -
            отрисовываем соответствующий контент, в зависимости от URL-пути.
            Иначе отрисовываем Preloader*/}
            {/*If the application is initialized -
             render the appropriate content based on the URL path.
             Otherwise, draw the Preloader*/}
            {initialized ?
                <Switch>
                    <Route exact path={'/'}>
                        <Redirect from={'/'} to={'/profile'}/>
                    </Route>
                    <Route path={'/profile/:userId?'}
                           render={() => <ProfileContainer/>}/>
                    <Route path={'/login'}
                           render={() => <Login/>}/>
                    <Route exact path={'/users'}>
                        <Redirect from={'/users'} to={'/users/page=search=friend='}/>
                    </Route>
                    <Route path={'/users/page=:page?search=:search?friend=:friend?'}
                           render={() => <Users/>}/>
                    <Route path={'*'}
                           render={() => <NoPageError/>}/>

                </Switch> :
                <Preloader/>
            }
        </HashRouter>
    );
}

{/*Получаем из state информацию о том, была ли произведена инициализация приложения*/}
{/*We get information from the state about whether the application has been initialized*/}
const mapStateToProps = (state) => {
    return (
        {
            initialized: state.auth.initialized
        }
    );
}

{/*Подключаем App компонент к store, передавая ей в пропсках параметры и Thunk Creator*/}
{/*We connect the App component to the store, passing it parameters and Thunk Creator in props*/}
export default connect(mapStateToProps, {initializeApp})(App);
