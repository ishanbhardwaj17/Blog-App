import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

async function register(name, email, password) {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password
        })
        return await response.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        console.error(error);
    }
}

async function login(email, password) {
    try {
        const response = await api.post('/login', {
            email,
            password
        })
        return await response.data;

    } catch (error) {
        console.error(error.response?.data || error.message);
        console.error(error);
    }
}
async function logout() {
    try {
        await api.post('/logout');
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
}

export {
    register,
    login,
    logout
};