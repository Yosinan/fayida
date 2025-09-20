import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, refreshToken } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // try restoring session on load
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            refreshToken()
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setUser(res.data.user);
                })
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const loginUser = async (credentials) => {
        const res = await login(credentials);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userId", res.data.user.id);
        setUser(res.data.user);
    };

    const logoutUser = async () => {
        await logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
