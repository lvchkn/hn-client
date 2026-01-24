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

const AuthCtx = createContext({} as AuthContext);
export const useAuth = () => useContext(AuthCtx);

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthProvider = (props: AuthProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
        name: "Unauthorized",
    });

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${BASE_URL}/userinfo`, {
                credentials: "include",
            });
            const json = await response.json();

            setIsAuthenticated(json.isAuthenticated);
            json.isAuthenticated && setUser({ name: json.name });
        };

        if (process.env.REACT_APP_AUTH_ENABLED) {
            getUser();
        }
    }, []);

    const returnUrl = encodeURIComponent(
        process.env.REACT_APP_CLIENT_URL ?? window.location.origin
    );

    const login = () => {
        window.location.href = `${BASE_URL}/login?returnUrl=${returnUrl}`;
    };

    const logout = () => {
        window.location.href = `${BASE_URL}/logout?returnUrl=${returnUrl}`;
    };

    return (
        <AuthCtx.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthCtx.Provider>
    );
};
