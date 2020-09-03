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

/*Компонент отрисовки страницы пользователей*/
/*User page rendering component*/
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
                            {/*Отрисовка строки поиска пользователей по имени*/}
                            {/*Rendering the search bar for users by name*/}
                            <input value={searchValue}
                                   onChange={(e) => changeSearchValue(e.currentTarget.value)}
                                   placeholder={'Search user name'}/>
                            <label>
                                {/*Отрисовка задания характеристики для отображения пользователей-друзей*/}
                                {/*Rendering of the characteristic setting for displaying user-friends*/}
                                <input type={'checkbox'} checked={checkValue}
                                       onChange={onChangeCheckValue}/>&nbsp;Friend&nbsp;</label>
                                {/*Отрисовка кнопки - отправки поискового запроса*/}
                                {/* Rendering a button - sending a search query*/}
                            <button onClick={onRequestSettingsChange}>
                                <img src={searchIcon} alt={'search'}/>
                            </button>
                        </div>
                    </div>
                    {/*Отрисовка строки выбора страницы в списке пользователей*/}
                    {/*Drawing the page selection line in the user list*/}
                    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                               totalUsersCount={totalUsersCount} pageSize={pageSize}/>
                </div>
            </div>
            {/*Если происходит загрузка списка пользователей - показывать Preloader, иначе - сам список пользователей*/}
            {/*If the user list is loaded, show Preloader, otherwise - the user list itself*/}
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

/*Контейнерный компонент страницы пользователей*/
/*User page container component*/
const UsersContainer = ({
                            users, pageSize, totalUsersCount, isFetching, followingIsProgress,
                            requestUsers, followUser, unfollowUser, ...props
                        }) => {

    /*Определение выбранной страницы в списке пользователей из URL, или, если ее нет, то автоматически присваивать 1*/
    /*Determining the selected page in the list of users from the URL, or, if it is not there, then automatically assign 1*/
    let currentPage = (props.match.params.page) || 1;

    /*Задание состояния, контролирующего вводимые значения строки поиска*/
    /*Setting a state that controls the entered values of the search string*/
    let [searchValue, changeSearchValue] = useState(props.match.params.search || '');
    /*Задание состояния, контролирующего изменение checkbox поиска друзей*/
    /*Setting the state controlling the change of the checkbox of the search for friends*/
    let [checkFriendValue, changeCheckFriendValue] = useState(Boolean(Number(props.match.params.friend)));

    /*Определение хука для получения нового списка пользователей при изменении номера страницы или ее размера*/
    /*Defining a hook to get a new list of users when the page number or page size changes*/
    useEffect(() => {
        requestUsers(currentPage, pageSize)
    }, [currentPage, pageSize, requestUsers]);

    /*Функция изменения значения в checkbox*/
    /*Function for changing value in checkbox*/
    const onChangeCheckValue = (e) => {
        changeCheckFriendValue(!checkFriendValue);
    }

    /*Функция запроса пользователей при изменении поисковых фильтров*/
    /*User query function when changing search filters*/
    const onRequestSettingsChange = () => {
        requestUsers(1, pageSize, searchValue, checkFriendValue);
        props.history.push(`/users/page=${1}search=${searchValue}friend=${checkFriendValue ? 1 : 0}`);
    }

    /*Функция обработки изменения номера страницы списка пользователей*/
    /*Function of handling change of page number of user list*/
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

/*Получение необходимых данных из state*/
/*Getting the required data from the state*/
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

/*Подключение контейнерного компонента к state и оборачивание хоком withRoute, получая доступ к URL-параметрам*/
/*Connecting container bean to state and wrapping withRoute hook, accessing url parameters*/
export default compose(
    connect(mapStateToProps, {requestUsers, followUser, unfollowUser}),
    withRouter,
    withAuthRedirect)
(UsersContainer);
