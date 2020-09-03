
/*Функция - валидатор на обязательность  заполнения поля*/
/* Function - validator for mandatory field filling */
export const required = (value) => {
    if (value)
        return undefined;
    return 'Field is required';
}

/*Функция - валидатор на ограничение по длине вводимого текста*/
/*Function - validator for limiting the length of the input text*/
export const maxLengthCreator = (maxLength) => (value) => {
    if (value && (value.length > maxLength))
        return `Max length is ${maxLength} symbols`;
    return undefined;
}