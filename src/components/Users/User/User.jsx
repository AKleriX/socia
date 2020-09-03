import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/defaultUser.png";
import style from './User.module.css';

/*Презентационный компонент отрисовки пользователя в списке*/
/*The presentation component of rendering the user in the list*/
const User = ({user, followingIsProgress, unfollowUser, followUser}) => {
    return (
        <div className={style.userCol}>
            <div className={style.userBlock}>
                <div className={style.userAvatarBlock}>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            {/*Если нету у пользователя фото - показывает фото по умолчанию*/}
                            {/*If the user does not have a photo, it shows the default photo*/}
                            <img className={style.userPhoto}
                                 src={user.photos.small != null ? user.photos.small : userPhoto}
                                 alt={'Profile'}/>
                        </NavLink>
                    </div>
                    <div className={style.followButton}>
                        {/*Меняем кнопку взаимодействия (подписка/отписки) с пользователем в зависимости от текущего состояния (подписанное/отписанное)*/}
                        {/*We change the interaction button (subscribe / unsubscribe) with the user, depending on the current state (signed / unsubscribed)*/}
                        {user.followed ?
                            <button disabled={followingIsProgress.some(id => id === user.id)} onClick={() => {
                                unfollowUser(user.id);
                            }}>Unfollow</button> :
                            <button disabled={followingIsProgress.some(id => id === user.id)} onClick={() => {
                                followUser(user.id);
                            }}>Follow</button>}
                    </div>
                </div>
                <div className={style.nameBlock}>
                <span>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            <h4>{user.name}</h4>
                        </NavLink>
                    </div>
                    <div>{user.status}</div>
                </span>
                </div>
            </div>
        </div>
    );
}

export default User;