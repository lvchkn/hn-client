import { Redirect, Route, Router } from "wouter";
import { navigate, useLocationProperty } from "wouter/use-location";
import { TopStoriesList } from "./stories/TopStoriesList";
import { NavLink } from "./navbar/NavLink";
import { RecommendedStoriesList } from "./stories/RecommendedStoriesList";
import { FavouriteStoriesList } from "./stories/FavouritedStoriesList";
import "./app.css";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface Context {
    isAuthenticated: boolean;
    user: { name: string };
    isLoading: boolean;
    login: () => void;
    logout: () => void;
}
export const AuthContext = createContext({} as Context);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (authProps: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<{ name: string }>({
        name: "Unauthorized",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getUser = async () => {
        const response = await fetch("https://localhost:7245/userinfo", {
            credentials: "include",
        });
        const json = await response.json();

        setIsAuthenticated(json.isAuthenticated);
        setIsLoading(false);
        if (json.isAuthenticated) setUser(json.claims);
    };

    useEffect(() => {
        getUser();
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
                isLoading,
                login,
                logout,
            }}
        >
            {authProps.children}
        </AuthContext.Provider>
    );
};

export const LoginButton = () => {
    // const [needsFetch, setNeedsFetch] = useState<boolean>(false);
    // const [isAuth, setAuth] = useState<boolean>(false);

    // useEffect(() => {
    //     const getUser = async () => {
    //         const response = await fetch("https://localhost:7245/userinfo");
    //         const json = await response.json();
    //         console.log(JSON.stringify(json));
    //         setAuth(true);
    //     };
    //     getUser();
    // }, []);

    // const handler = () => {
    //     window.location.href =
    //         "https://localhost:7245/login?returnUrl=http://localhost:8080/";
    // };

    // const handlerOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // await new Promise<void>((resolve, reject) => {
    //     window.location.href = "https://localhost:7245/logout";
    //     resolve();
    // });
    // setNeedsFetch(true);
    // };

    return (
        <>
            <NavLink href="/login">
                {/* <button onClick={handler} className="login"> */}
                Login
                {/* </button> */}
            </NavLink>
        </>
    );
};

export const App = () => {
    return (
        <AuthProvider>
            <App2 />
        </AuthProvider>
    );
};

export const App2 = () => {
    const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

    const hashNavigate = (to: string) => navigate("#" + to);

    const useHashLocation = (): [string, (nav: string) => void] => {
        const location = useLocationProperty(hashLocation);
        return [location, hashNavigate];
    };

    const { login, logout, isAuthenticated, user, isLoading } = useAuth();

    return (
        <Router hook={useHashLocation}>
            <div className="header">
                <h1>
                    <NavLink href="/hn-client">Hacker News Feed </NavLink>
                </h1>
                <LoginButton />
            </div>
            <div className="tabs">
                <NavLink href="/top" className="tab">
                    Top
                </NavLink>
                <NavLink href="/recs" className="tab">
                    Recs
                </NavLink>
                <NavLink href="/favs" className="tab">
                    Favs
                </NavLink>
            </div>

            <Route path="/">
                <Redirect to="/hn-client" />
                {<TopStoriesList />}
            </Route>
            <Route path="/login">
                {() => {
                    login();
                    return null;
                }}
            </Route>
            <Route path="/hn-client">{<TopStoriesList />}</Route>
            <Route path="/top">{<TopStoriesList />}</Route>
            <Route path="/recs">{<RecommendedStoriesList />}</Route>
            <Route path="/favs">{<FavouriteStoriesList />}</Route>
        </Router>
    );
};
