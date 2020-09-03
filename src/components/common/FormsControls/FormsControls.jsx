import style from './FormsControls.module.css';
import cn from 'classnames';
import React from "react";
import {Field} from "redux-form";

{/*Вспомогательная функция для оборачивания полей под возможность валидации и оформления через ReduxForm*/}
{/* Helper function for wrapping fields for validation and formatting via ReduxForm */}
const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = (touched && error) ? style.error : '';
    return (
        <div className={cn(style.formControl, hasError)}>
            <div>
                {children}
            </div>
            {(touched && error)&& <span>{error}</span>}
        </div>
    );
}

{/*Получение Textarea обернутого в FormControl*/}
{/*Getting Textarea wrapped in FormControl*/}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
      <FormControl {...props}>
          <textarea {...input} {...restProps}/>
      </FormControl>
    );
}

{/*Получение Input обернутого в FormControl*/}
{/*Getting an Input wrapped in a FormControl*/}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
      <FormControl {...props}>
          <input {...input} {...restProps}/>
      </FormControl>
    );
}

{/*Вспомогательная функция для получения полей ввода в ReduxForm, получает:
placeholder - placeholder будущего поля
name - уникальное имя будущего поля
validators - массив с валидаторами поля
component - компонент поля
props - прочие пропсы
text - такст, который будет находится рядом с полем*/}

{/* Helper function for getting input fields in ReduxForm, gets:
    placeholder - placeholder of the future field
    name - a unique name for the future field
    validators - array with field validators
    component - the component of the field
    props - other props
    text - text that will be next to the field */}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    return (
        <div>
            <Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/>
            {text !== '' ? <span>{text}</span> : ''}
        </div>
    );
}