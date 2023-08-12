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

export const AuthProvider = (props: AuthProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
        name: "Unauthorized",
    });

    const getUser = async () => {
        const response = await fetch("https://localhost:7245/userinfo", {
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
        window.location.href =
            "https://localhost:7245/login?returnUrl=http://localhost:8080/";
    };

    const logout = () => {
        window.location.href = "https://localhost:7245/logout";
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
