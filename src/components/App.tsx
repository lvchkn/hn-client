import { JSX, lazy, Suspense, useEffect, useState } from "react";
import { Redirect, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useAuth } from "./auth/AuthProvider";
import { NavLink } from "./navbar/NavLink";
import { Processing, SortField, SortOrder } from "./processing/Processing";
import { StoriesLoader } from "./loader/StoriesLoader";
import { CookieBanner } from "./CookieBanner";
import "./app.css";

const TopStoriesList = lazy(() =>
    import("./stories/lists/TopStoriesList").then((module) => ({
        default: module.TopStoriesList,
    }))
);
const RecommendedStoriesList = lazy(() =>
    import("./stories/lists/RecommendedStoriesList").then((module) => ({
        default: module.RecommendedStoriesList,
    }))
);
const FavouriteStoriesList = lazy(() =>
    import("./stories/lists/FavouritedStoriesList").then((module) => ({
        default: module.FavouriteStoriesList,
    }))
);
const TagCloud = lazy(() =>
    import("./stories/TagCloud").then((module) => ({
        default: module.TagCloud,
    }))
);

type Theme = "light-theme" | "dark-theme";
const LightTheme: Theme = "light-theme";
const DarkTheme: Theme = "dark-theme";

export const App = () => {
    const { login, logout, user, isAuthenticated } = useAuth();

    const [search, setSearch] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const [sortField, setSortField] = useState<SortField>("score");

    const [theme, setTheme] = useState<Theme>(() => {
        try {
            const savedTheme = localStorage.getItem("theme");

            if (savedTheme === DarkTheme || savedTheme === LightTheme) {
                return savedTheme;
            }
        } catch {
            console.warn("Failed to load theme from localStorage");
        }

        return LightTheme;
    });

    useEffect(() => {
        if (theme === DarkTheme) {
            document.body.classList.add(DarkTheme);
        } else {
            document.body.classList.remove(DarkTheme);
        }

        try {
            localStorage.setItem("theme", theme);
        } catch {
            console.warn("Failed to save theme to localStorage");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === LightTheme ? DarkTheme : LightTheme));
    };

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const handleSortOrderChange = (order: SortOrder) => {
        setSortOrder(order);
    };

    const handleSortFieldChange = (field: SortField) => {
        setSortField(field);
    };

    const topStoriesJsx: JSX.Element = (
        <TopStoriesList
            search={search}
            sortField={sortField}
            sortOrder={sortOrder}
        />
    );

    return (
        <Router hook={useHashLocation}>
            <div className="header">
                <h1>
                    <NavLink href="/" isDefaultPage={true}>
                        HackerNews Feed
                    </NavLink>
                </h1>
                <div className="header-actions">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === LightTheme ? "🌙 Dark" : "☀️ Light"}
                    </button>
                    {process.env.REACT_APP_AUTH_ENABLED && (
                        <button
                            onClick={isAuthenticated ? logout : login}
                            className="login-button"
                        >
                            {isAuthenticated
                                ? `Logout (${user?.name})`
                                : "Login"}
                        </button>
                    )}
                </div>
            </div>
            <main>
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
                    <NavLink
                        href="/tag-cloud"
                        className="tab"
                        isDefaultPage={false}
                    >
                        Tag Cloud
                    </NavLink>
                </div>

                <Processing
                    searchText={search}
                    search={handleSearch}
                    sortOrder={sortOrder}
                    changeSortOrder={handleSortOrderChange}
                    sortField={sortField}
                    changeSortField={handleSortFieldChange}
                />

                <Suspense fallback={<StoriesLoader />}>
                    <Route path="/hn-client">
                        <Redirect to="/" />
                    </Route>

                    <Route path="/">{topStoriesJsx}</Route>
                    <Route path="/top">{topStoriesJsx}</Route>
                    <Route path="/top/:page">{topStoriesJsx}</Route>
                    <Route path="/favs">
                        <FavouriteStoriesList />
                    </Route>
                    <Route path="/recs">
                        <RecommendedStoriesList />
                    </Route>
                    <Route path="/tag-cloud">
                        <TagCloud />
                    </Route>
                </Suspense>
            </main>
            <CookieBanner />
        </Router>
    );
};
