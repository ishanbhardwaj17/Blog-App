import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

async function register(name, email, password) {
    try {
        const response = await api.post("/register", {
            name, // send the name field expected by the backend
            email,
            password
        })
        return response.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        console.error(error);
        throw error;
    }
}

async function login(email, password) {
    try {
        const response = await api.post('/login', {
            email,
            password
        })
        return response.data;

    } catch (error) {
        console.error(error.response?.data || error.message);
        console.error(error);
        throw error;
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