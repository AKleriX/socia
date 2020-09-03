
/*Вспомогательная функция обновления объектов в масиве.
* items - массив
* itemId - id интересующего объекта
* objPropName - рассматриваемое свойство объекта
* newObjProps - новое свойство объекта*/

/* Helper function for updating objects in the array.
* items - an array
* itemId - id of the object of interest
* objPropName - object property in question
* newObjProps - new object property */
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId)
            return {...u, ...newObjProps};
        return u;
    });
}