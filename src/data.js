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

    // Метод для получения медов
    async getMed(userId) {
        try {
            const response = await this.apiClient.get(`/getMed/${userId}`);
            return response.data; // Возвращаем данные в формате JSON
        } catch (error) {
            console.error('Ошибка при получении мёда:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    // Метод для редактирования медов
    async redMed(number, name, amount, amountMerc, address, analysis, date) {
        try {
            const response = await this.apiClient.get(`/redMed/${number}/${name}/${amount}/${amountMerc}/${address}/${analysis}/${date}`);
            return response.data; // Возвращаем данные в формате JSON
        } catch (error) {
            console.error('Ошибка при редактировании:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    // Метод для добавления мёда
    async addMed(id, name, amount, address, merc, analysis, date) {
        try {
            const response = await this.apiClient.get(`/addMed/${id}/${name}/${amount}/${address}/${merc}/${analysis}/${date}`);
            return response.data; // Возвращаем данные в формате JSON
        } catch (error) {
            console.error('Ошибка при добавлении:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    // Удаление мёда
    async delMed(number){
        try{
            const response = await this.apiClient.get(`/delMed/${number}`)
            return response.data
        } catch(error){
            console.error('Ошибка:', error);
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

    //Регистрация
    async redUser(id, username, number){
        try{
            const response = await this.apiClient.get(`/redUser/${id}/${username}/${number}`)
            return response.data
        } catch(error){
            console.error('Ошибка при редактировании:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
}

export default UserService;