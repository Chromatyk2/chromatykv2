import {createContext,useContext,useEffect,useState} from "react";
import Axios from "axios";

const AuthContext = createContext();
export function AuthProvider({
    children
}) {
    const [user, setUser] =
        useState(null);
    const [loading, setLoading] =
        useState(true);
    useEffect(() => {
        Axios.get("/api/me")
            .then((res) => {
                setUser(
                    res.data.user
                );
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (

        <AuthContext.Provider
            value={{user,setUser,loading}}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(
        AuthContext
    );
}