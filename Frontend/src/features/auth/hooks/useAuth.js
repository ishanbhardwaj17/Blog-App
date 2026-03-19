import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import * as authApi from "../services/auth.api";

const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const {user, loading, error, setUser, setLoading, setError} = context;

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authApi.login(email, password);
            setUser(response.user);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authApi.register(name, email, password);
            setUser(response.user);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);
        }
    };
    return {
        handleLogin,
        handleRegister,
        handleLogout,
        user,
        loading,
        error
    }
};

export default useAuth;



