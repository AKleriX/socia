import * as axios from "axios";

// Настройка экземпляра axios для работы с API сервера

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '274815a1-0648-4039-8a5e-cbd1e3d20df1'
    }
});

// Ообъект для работы с API авторизации

export const authAPI = {

    // Авторизация на сервере, получение своего id, login и e-mail
    getAuth() {
        return (instance.get('auth/me')
            .then(response => {
                return response.data;
            }));
    },

    // Login на сервере, отправка объекта с данными из формы

    login(email, password, rememberMe = false, captcha = null) {
        return (instance.post('auth/login', {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            }));
    },

    // Logout на сервере, удаление cookie

    logout() {
        return (instance.delete('auth/login')
            .then(response => {
                return response.data;
            }));
    },

    // Получение URL-ссылки на картинку-каптчу

    getCaptchaURL() {
        return (instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            }));
    }
}

// Объект для работы с API сервера с данными всех пользователей

export const usersAPI = {

    // Полуение списка пользователей с постранично, задавая номер страницы,
    // число пользователей на ней, поиск по имени и наличие пользователей в друзьях
    getUsers(currentPage = 1, usersCount = 10, term = '', friend = false) {
        return (instance.get(`users?page=${currentPage}&count=${usersCount}&term=${term}&friend=${friend ? friend : ''}`)
            .then(response => {
                return (response.data);
            }));
    }
}

// Объект для работы с API сервера для осуществления подписки и отписки от пользователя

export const followAPI = {

    // Подпискана пользователя с заданным id
    follow(userId) {
        return (instance.post(`follow/${userId}`)
            .then(response => {
                return (response.data);
            }));
    },

    // Отписка от пользователя с заданным id
    unfollow(userId) {
        return (instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            }));
    }
}

// Объект для работы с API сервера по профилям пользователей

export const profileAPI = {

    // Получение данных профиля пользователя с заданным id
    getProfileData(userId) {
        return (instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            }));
    },

    // Получение статуса пользователя с заданным id
    getProfileStatus(userId) {
        return (instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            }));
    },

    // Отвравка новых данных из формы авторизированного пользователя
    setProfileData(newProfileData) {
        return (instance.put(`profile`, newProfileData)
                .then(response => {
                    return response.data;
                })
        );
    },

    // Отправка нового статуса авторизированного пользователя из строки input,
    // путем вормирования своего объекта с данными, ожидаемого сермером
    setProfileStatus(newStatus) {
        return (instance.put(`profile/status/`, {status: newStatus})
            .then(response => {
                return response.data;
            }));
    },

    // Задание новой фотографии авторизированного пользователя, отпарвкой загруженного файла-картинки
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