import style from './FormsControls.module.css';
import cn from 'classnames';
import React from "react";
import {Field} from "redux-form";

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

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
      <FormControl {...props}>
          <textarea {...input} {...restProps}/>
      </FormControl>
    );
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
      <FormControl {...props}>
          <input {...input} {...restProps}/>
      </FormControl>
    );
}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    return (
        <div>
            <Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/>
            {text !== '' ? <span>{text}</span> : ''}
        </div>
    );
}