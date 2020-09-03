import React from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";


/*Получение из state необходимых данных*/
/*Getting the necessary data from the state*/
const mapStateToProps = (state) => {
    return (
        {
            isAuth: state.auth.isAuth
        }
    );
}


/*Хок для контроля авторизации пользователя перед переходом на ту или иную страницу. Если авторизация не выполнена -
* переадресация на Login*/
/*Hook to control user authorization before going to a particular page. If authorization failed -
* redirect to Login*/
export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        if (!props.isAuth)
            return (
                <Redirect to={'/login'} />
            );
        return (
            <Component {...props} />
        );
    }

    /*Подключение полученного компонента к store*/
    /*Connecting the received component to the store*/
    return connect(mapStateToProps)(RedirectComponent);

}