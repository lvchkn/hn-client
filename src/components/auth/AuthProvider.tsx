import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { User } from "./User";

export interface AuthContext {
    isAuthenticated: boolean;
    user: User;
    login: () => void;
    logout: () => void;
}

export interface AuthProps {
    children: ReactNode;
}

const AuthContext = createContext({} as AuthContext);
export const useAuth = () => useContext(AuthContext);

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthProvider = (props: AuthProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
        name: "Unauthorized",
    });

    const getUser = async () => {
        const response = await fetch(`${BASE_URL}/userinfo`, {
            credentials: "include",
        });
        const json = await response.json();

        setIsAuthenticated(json.isAuthenticated);
        json.isAuthenticated && setUser({ name: json.name });
    };

    useEffect(() => {
        process.env.REACT_APP_AUTH_ENABLED && getUser();
    }, []);

    const login = () => {
        window.location.href = `${BASE_URL}/login?returnUrl=${process.env.REACT_APP_CLIENT_URL}`;
    };

    const logout = () => {
        window.location.href = `${BASE_URL}/logout`;
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
