import React, {useEffect, useState} from "react";
import errorsStyle from '../../common/FormsControls/FormsControls.module.css';
import cn from 'classnames';

/*Компонент отрисовки статуса пользователя*/
/*User status rendering component*/
const ProfileStatus = ({status, setNewProfileStatus, isOwner}) => {

    /*Создаем локальные хуки-состояния для контроля перехода в режим редактирования,
    текста статуса и ошибок*/
    /*Create local state hooks to control the transition to edit mode,
     texts status and errors*/
    let [statusEditMode, setStatusEditMode] = useState(false);
    let [correctStatus, setStatus] = useState(status);
    let [error, setError] = useState(
        {
            textError: null,
            hasErrorStyle: null
        }
    );

    /*Задаем хук для обновления статутса при его изменении в Redux-state*/
    /*Set a hook to update the status when it changes in the Redux-state*/
    useEffect(() => {
        setStatus(status);
    }, [status]);

    /*Функция входа и выхода из режима редактирования*/
    /*Function to enter and exit edit mode*/
    const activationEditMode = (activateValue) => {
        /*Если пользователь является владельцем профиля*/
        /*If the user is the owner of the profile*/
        if (isOwner) {
            /*Если перешли в режим редактирования, то меняем state*/
            /*If we switched to edit mode, then we change the state*/
            if (activateValue) {
                setError({
                    textError: null,
                    hasErrorStyle: null
                });
                setStatusEditMode(activateValue);
            }
            else {
                /*Иначе, проверяем длинну заданного статуса, и если она удовлетворяет требованиям,
                то задаем новый статус*/
                /*Otherwise, we check the length of the given status, and if it meets the requirements,
                 then we set a new status*/
                if (correctStatus.length >= 300) {
                    setError({
                        textError: 'Max length: 300 symbols',
                        hasErrorStyle: cn(errorsStyle.formControl, errorsStyle.error)
                    });
                    return ;
                }
                setStatusEditMode(activateValue);
                setNewProfileStatus(correctStatus);
            }
        }
    }

    /*Функция обработки изменения статуса*/
    /*Status change processing function*/
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {/*Если нет режима редактирования статуса, то показываем span, иначе - input и, возможно, ошибку*/}
            {/*If there is no status editing mode, then we show span, otherwise - input and, possibly, an error*/}
                {!statusEditMode ?
                    <div>
                        <span onDoubleClick={() => {activationEditMode(true)}}>{status || ''}</span>
                    </div> :
                    <div className={error.hasErrorStyle}>
                        <input autoFocus={true} onBlur={() => activationEditMode(false)}
                               onChange={onStatusChange} value={correctStatus}/>
                        {error.textError && <p className={errorsStyle.formSummaryError}>{error.textError}</p>}
                    </div>}
        </div>
    );
}

export default ProfileStatus;