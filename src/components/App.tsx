import { Redirect, Route, Router } from "wouter";
import { navigate, useLocationProperty } from "wouter/use-location";
import { useAuth } from "./auth/AuthProvider";
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

    const { login } = useAuth();

    return (
        <Router hook={useHashLocation}>
            <div className="header">
                <h1>
                    <NavLink href="/" isDefaultPage={true}>
                        Hacker News Feed
                    </NavLink>
                </h1>
                {process.env.REACT_APP_AUTH_ENABLED && (
                    <button onClick={login} className="login-button">
                        Login
                    </button>
                )}
            </div>
            <div className="tabs">
                <NavLink href="/top" className="tab" isDefaultPage={true}>
                    Top
                </NavLink>
                <NavLink href="/favs" className="tab" isDefaultPage={false}>
                    Favs
                </NavLink>
                <NavLink href="/recs" className="tab" isDefaultPage={false}>
                    Recs
                </NavLink>
            </div>

            <Route path="/hn-client">
                <Redirect to="/" />
                {<TopStoriesList />}
            </Route>

            <Route path="/">{<TopStoriesList />}</Route>
            <Route path="/top">{<TopStoriesList />}</Route>
            <Route path="/top/:page" component={TopStoriesList}></Route>
            <Route path="/favs">{<FavouriteStoriesList />}</Route>
            <Route path="/recs">{<RecommendedStoriesList />}</Route>
        </Router>
    );
};
