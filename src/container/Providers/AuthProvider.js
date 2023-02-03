import {createContext} from "react";
import {useLocalStorage} from "../../userHooks/useLocalStorage";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useLocalStorage('access_token', null);

    const login = (token, nav) => {
        setToken(token);
        nav();
    }

    const logout = (nav) => {
        setToken(null);
        nav();
    }

    const value = {
        token,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
}
