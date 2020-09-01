import React from "react";
import style from './ProfileContacts.module.css';
import contactsIcon from '../../../../assets/images/contact.svg';


const ProfileContacts = ({contacts}) => {
    const contactsList = Object.keys(contacts).filter(contact => {
        return !!contacts[contact];
    });

    return (
        <div className={style.tabPanel}>
            <div className={style.centralMeta}>
                <div className={style.pageName}>
                    <img src={contactsIcon} alt={'Contacts'}/>
                    &nbsp;Contacts:
                </div>
                {contactsList.length === 0 ? <p>No contacts</p> :
                contactsList.map(contact => <Contact key={contact} contactTitle={contact}
                                                      contactValue={contacts[contact]}/>)}
            </div>
        </div>
    );
}

const Contact = ({contactTitle, contactValue}) => {
    let refContactValue = contactValue;
    if (refContactValue.indexOf('http') === -1)
        refContactValue = `https://${contactValue}`;
    return (
        <p><b>{contactTitle}</b>: <a href={refContactValue}>{contactValue}</a></p>
    );
}


export default ProfileContacts;