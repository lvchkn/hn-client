import { Redirect, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useAuth } from "./auth/AuthProvider";
import { NavLink } from "./navbar/NavLink";
import { TopStoriesList } from "./stories/lists/TopStoriesList";
import { RecommendedStoriesList } from "./stories/lists/RecommendedStoriesList";
import { FavouriteStoriesList } from "./stories/lists/FavouritedStoriesList";
import "./app.css";

export const App = () => {
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
