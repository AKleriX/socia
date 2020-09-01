import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/defaultUser.png";
import style from './User.module.css';

const User = ({user, followingIsProgress, unfollowUser, followUser}) => {
    return (
        <div className={style.userCol}>
            <div className={style.userBlock}>
                <div className={style.userAvatarBlock}>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            <img className={style.userPhoto}
                                 src={user.photos.small != null ? user.photos.small : userPhoto}
                                 alt={'Profile'}/>
                        </NavLink>
                    </div>
                    <div className={style.followButton}>
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