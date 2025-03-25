import axios from "axios"

class UserService {
    constructor(baseURL) {
        this.apiClient = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Метод для получения пользователя по ID
    async getUser(userId) {
        try {
            const response = await this.apiClient.get(`/getUser/${userId}`);
            return response.data; // Возвращаем данные в формате JSON
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    //Регистрация
    async addUser(id, number, alias, username){
        try{
            const response = await this.apiClient.get(`/addUser/${id}/${number}/${alias}/${username}`)
            return response.data
        } catch(error){
            console.error('Ошибка при регистрации:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
}

export default UserService;