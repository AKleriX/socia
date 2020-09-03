import React from 'react';
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import Header from "./Header";

/*Контейнерная компонента для Header*/
/*Container component for Header*/
const HeaderContainer = (props) => {
    return(
        <Header {...props} />
    );
}

/*Получаем из State данные, необходимые для Header*/
/*We get the data required for Header from State*/
const mapStateToProps = (state) => {
    return(
        {
            login: state.auth.login,
            isAuth: state.auth.isAuth,
            userId: state.auth.userId,
            initialized: state.auth.initialized
        }
    );
}

/*Подключаем контейнерную компоненту к Store и получаем из него необходимые функции и данные*/
/*We connect the container component to the Store and get the necessary functions and data from it*/
export default connect(mapStateToProps, {logout})(HeaderContainer);