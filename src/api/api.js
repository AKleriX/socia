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
// Объект для работы с API сервера по диалогам с пользователями
// Object for working with the server API by dialogs with users
export const dialogsAPI =  {

    // Получение списка всех начатых диалогов
    // Getting a list of all started dialogs
    getAllDialogs() {
        return (instance.get(`dialogs`)
            .then(response => {
                return response.data;
            }));
    },

    // Начало диалога с пользователем по его userId
    // Starting a dialogue with a user by his userId
    startChatting(userId) {
        return (instance.put(`dialogs/${userId}`)
            .then(response => {
                return response.data;
            }));
    },

    // Получение списка сообщений с пользователем по его userId
    // Getting a list of messages with a user by his userId
    getListOfMessages(userId) {
        return (instance.get(`dialogs/${userId}/messages`)
            .then(response => {
                return response.data;
            }));
    },

    // Отправка сообщения message пользователю по его userId
    // Sending a message to a user by his userId
    sendMessage(userId, message) {
        return (instance.post(`dialogs/${userId}/messages`, {body: message})
            .then(response => {
                return response.data;
            }));
    },

    // Получение проверки просмотра своего отправленного сообщения по его messageId
    // Receive a view check for your sent message by its messageId
    viewedMessage(messageId) {
        return (instance.get(`dialogs/messages/${messageId}/viewed`)
            .then(response => {
                return response.data;
            }));
    },

    // Отправка сообщения с заданным messageId в спам
    // Sending a message with a given messageId to spam
    addMessageToSpam(messageId) {
        return (instance.post(`dialogs/messages/${messageId}/spam`)
            .then(response => {
                return response.data;
            }));
    },

    // Удаление сообщения с заданным messageId только для себя
    // Deleting a message with a given messageId only for yourself
    deleteMessage(messageId) {
        return (instance.delete(`dialogs/messages/${messageId}`)
            .then(response => {
                return response.data;
            }));
    },

    // Восстановление удаленного или отмеченного как спам сообщения по его userId
    // Recovering a deleted or marked spam message by its userId
    restoreMessage(messageId) {
        return (instance.put(`dialogs/messages/${messageId}/restore`)
            .then(response => {
                return response.data
            }));
    },

    // Получение сообщений с пользователем по его userId за дату date
    // Receiving messages with a user by his userId for date date
    getMessageThanDate(userId, date) {
        return (instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`)
            .then(response => {
                return response.data;
            }));
    },


    // Получение списка новых сообщений, еще не просмотренных
    // Retrieving a list of new messages not yet viewed
    getNewMessages() {
        return (instance.get(`dialogs/messages/new/count`)
            .then(response => {
                return response.data;
            }));
    }
}