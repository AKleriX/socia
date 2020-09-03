import * as axios from "axios";

// Настройка экземпляра axios для работы с API сервера
// Setting up the axios instance to work with the server API

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '274815a1-0648-4039-8a5e-cbd1e3d20df1'
    }
});

// Объект для работы с API авторизации
// Object for working with the authorization API

export const authAPI = {

    // Авторизация на сервере, получение своего id, login и e-mail
    // Authorization on the server, getting your id, login and e-mail
    getAuth() {
        return (instance.get('auth/me')
            .then(response => {
                return response.data;
            }));
    },

    // Login на сервере, отправка объекта с данными из формы
    // Login on the server, sending an object with data from the form
    login(email, password, rememberMe = false, captcha = null) {
        return (instance.post('auth/login', {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            }));
    },

    // Logout на сервере, удаление cookie
    // Logout on the server, delete cookies
    logout() {
        return (instance.delete('auth/login')
            .then(response => {
                return response.data;
            }));
    },

    // Получение URL-ссылки на картинку-каптчу
    // Get a URL link to a captcha image
    getCaptchaURL() {
        return (instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            }));
    }
}

// Объект для работы с API сервера с данными всех пользователей
// Object for working with the server API with the data of all users
export const usersAPI = {

    // Полуение списка пользователей с постранично, задавая номер страницы,
    // число пользователей на ней, поиск по имени и наличие пользователей в друзьях
    // Sending a list of users with page by page specifying the page number,
    // the number of users on it, search by name and the presence of users in friends
    getUsers(currentPage = 1, usersCount = 10, term = '', friend = false) {
        return (instance.get(`users?page=${currentPage}&count=${usersCount}&term=${term}&friend=${friend ? friend : ''}`)
            .then(response => {
                return (response.data);
            }));
    }
}

// Объект для работы с API сервера для осуществления подписки и отписки от пользователя
// Object for working with the server API to subscribe and unsubscribe from the user
export const followAPI = {

    // Подпискана пользователя с заданным id
    // Subscribed user with the given id
    follow(userId) {
        return (instance.post(`follow/${userId}`)
            .then(response => {
                return (response.data);
            }));
    },

    // Отписка от пользователя с заданным id
    // Unsubscribe from the user with the given id
    unfollow(userId) {
        return (instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            }));
    }
}

// Объект для работы с API сервера по профилям пользователей
// Object for working with the server API by user profiles
export const profileAPI = {

    // Получение данных профиля пользователя с заданным id
    // Get user profile data with the given id
    getProfileData(userId) {
        return (instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            }));
    },

    // Получение статуса пользователя с заданным id
    // Get the status of the user with the given id
    getProfileStatus(userId) {
        return (instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            }));
    },

    // Отвравка новых данных из формы авторизированного пользователя
    // Send new data from the logged in user form
    setProfileData(newProfileData) {
        return (instance.put(`profile`, newProfileData)
                .then(response => {
                    return response.data;
                })
        );
    },

    // Отправка нового статуса авторизированного пользователя из строки input,
    // путем вормирования своего объекта с данными, ожидаемого сервером
    // Send the new status of the authorized user from the input string,
    // by rendering its data object as expected by the server
    setProfileStatus(newStatus) {
        return (instance.put(`profile/status/`, {status: newStatus})
            .then(response => {
                return response.data;
            }));
    },

    // Задание новой фотографии авторизированного пользователя, отпарвкой загруженного файла-картинки
    // Setting a new photo of an authorized user by uploading the uploaded image file
    setProfilePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return (instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                return response.data;
            }));
    }
}