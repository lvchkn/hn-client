import { Redirect, Route, Router } from "wouter";
import { navigate, useLocationProperty } from "wouter/use-location";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import { TopStoriesList } from "./stories/TopStoriesList";
import { NavLink } from "./navbar/NavLink";
import { RecommendedStoriesList } from "./stories/RecommendedStoriesList";
import { FavouriteStoriesList } from "./stories/FavouritedStoriesList";
import "./app.css";

export const App = () => {
    const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

    const hashNavigate = (to: string) => navigate("#" + to);

    const useHashLocation = (): [string, (nav: string) => void] => {
        const location = useLocationProperty(hashLocation);
        return [location, hashNavigate];
    };

    const { login, logout } = useAuth();

    return (
        <AuthProvider>
            <Router hook={useHashLocation}>
                <div className="header">
                    <h1>
                        <NavLink href="/hn-client">Hacker News Feed </NavLink>
                    </h1>
                    {process.env.REACT_APP_AUTH_ENABLED && (
                        <NavLink href="/login">Login</NavLink>
                    )}
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

                <Route path="/logout">
                    {() => {
                        logout();
                        return null;
                    }}
                </Route>

                <Route path="/hn-client">{<TopStoriesList />}</Route>
                <Route path="/top">{<TopStoriesList />}</Route>
                <Route path="/recs">{<RecommendedStoriesList />}</Route>
                <Route path="/favs">{<FavouriteStoriesList />}</Route>
            </Router>
        </AuthProvider>
    );
};
