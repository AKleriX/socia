import React from 'react';
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import Header from "./Header";

const HeaderContainer = (props) => {
    return(
        <Header {...props} />
    );
}

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

export default connect(mapStateToProps, {logout})(HeaderContainer);