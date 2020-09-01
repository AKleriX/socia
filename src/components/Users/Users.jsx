import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {followUser, requestUsers, unfollowUser} from "../../redux/users-reducer";
import Paginator from "./Paginator/Paginator";
import {Preloader} from "../common/Preloader/Preloader";
import User from "./User/User";
import {withAuthRedirect} from "../../hoc/withAuthRedurect";
import style from './Users.module.css';
import searchIcon from '../../assets/images/searchIcon.svg';

const Users = ({
                   users, pageSize, totalUsersCount, currentPage, isFetching,
                   followingIsProgress, followUser, unfollowUser, onPageChanged,
                   changeSearchValue, searchValue, checkValue, onChangeCheckValue,
                   onRequestSettingsChange
               }) => {
    return (
        <div>
            <div className={style.centralMetaContainer}>
                <div className={style.centralMeta}>
                    <div className={style.searchBlock}>
                        <div className={style.searchCol}>
                            <input value={searchValue}
                                   onChange={(e) => changeSearchValue(e.currentTarget.value)}
                                   placeholder={'Search user name'}/>
                            <label>
                                <input type={'checkbox'} checked={checkValue}
                                       onChange={onChangeCheckValue}/>&nbsp;Friend&nbsp;</label>
                            <button onClick={onRequestSettingsChange}>
                                <img src={searchIcon} alt={'search'}/>
                            </button>
                        </div>
                    </div>
                    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                               totalUsersCount={totalUsersCount} pageSize={pageSize}/>
                </div>
            </div>
            {
                isFetching ? <Preloader/> : users.map(user => <User key={user.id}
                                                                    user={user}
                                                                    followingIsProgress={followingIsProgress}
                                                                    unfollowUser={unfollowUser}
                                                                    followUser={followUser}/>)
            }
        </div>
    );
}

const UsersContainer = ({
                            users, pageSize, totalUsersCount, isFetching, followingIsProgress,
                            requestUsers, followUser, unfollowUser, ...props
                        }) => {

    let currentPage = (props.match.params.page) || 1;

    let [searchValue, changeSearchValue] = useState(props.match.params.search || '');
    let [checkFriendValue, changeCheckFriendValue] = useState(Boolean(Number(props.match.params.friend)));

    useEffect(() => {
        requestUsers(currentPage, pageSize)
    }, [currentPage, pageSize, requestUsers]);

    const onChangeCheckValue = (e) => {
        changeCheckFriendValue(!checkFriendValue);
    }

    const onRequestSettingsChange = () => {
        requestUsers(1, pageSize, searchValue, checkFriendValue);
        props.history.push(`/users/page=${1}search=${searchValue}friend=${checkFriendValue ? 1 : 0}`);
    }

    const onPageChanged = (e) => {
        requestUsers(e.selected + 1, pageSize,
            (props.match.params.search || ''), Boolean(Number(props.match.params.friend)));
        changeCheckFriendValue(Boolean(Number(props.match.params.friend)));
        changeSearchValue(props.match.params.search || '');
        props.history.push(`/users/page=${e.selected + 1}search=${props.match.params.search || ''}friend=${props.match.params.friend || 0}`);
    }

    return (
        <Users users={users} pageSize={pageSize} totalUsersCount={totalUsersCount} currentPage={currentPage}
               isFetching={isFetching} followingIsProgress={followingIsProgress} requestUsers={requestUsers}
               followUser={followUser} unfollowUser={unfollowUser} onPageChanged={onPageChanged}
               searchValue={searchValue} changeSearchValue={changeSearchValue}
               checkValue={checkFriendValue} onChangeCheckValue={onChangeCheckValue}
               onRequestSettingsChange={onRequestSettingsChange}/>
    );
}

const mapStateToProps = (state) => {
    return (
        {
            users: state.users.users,
            pageSize: state.users.pageSize,
            totalUsersCount: state.users.totalUsersCount,
            isFetching: state.users.isFetching,
            followingIsProgress: state.users.followingIsProgress
        }
    );
}

export default compose(
    connect(mapStateToProps, {requestUsers, followUser, unfollowUser}),
    withRouter,
    withAuthRedirect)
(UsersContainer);
