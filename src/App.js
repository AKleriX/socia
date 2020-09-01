import React, {useEffect} from 'react';
import './App.css';
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {initializeApp} from "./redux/auth-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import NoPageError from "./components/NoPageError/NoPageError";

const App = ({initializeApp, initialized}) => {

    useEffect(() => {
        initializeApp()
    });

    return (
        <BrowserRouter>
            <HeaderContainer/>
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
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return (
        {
            initialized: state.auth.initialized
        }
    );
}

export default connect(mapStateToProps, {initializeApp})(App);
