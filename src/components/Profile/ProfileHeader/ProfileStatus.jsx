import React, {useEffect, useState} from "react";
import errorsStyle from '../../common/FormsControls/FormsControls.module.css';
import cn from 'classnames';

const ProfileStatus = ({status, setNewProfileStatus, isOwner}) => {
    let [statusEditMode, setStatusEditMode] = useState(false);
    let [correctStatus, setStatus] = useState(status);
    let [error, setError] = useState(
        {
            textError: null,
            hasErrorStyle: null
        }
    );

    useEffect(() => {
        setStatus(status);
    }, [status]);

    const activationEditMode = (activateValue) => {
        if (isOwner) {
            if (activateValue) {
                setError({
                    textError: null,
                    hasErrorStyle: null
                });
                setStatusEditMode(activateValue);
            }
            else {
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

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
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