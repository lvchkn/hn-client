import { Link, Route } from "wouter";
import { TopStoriesList } from "./stories/TopStoriesList";
import { NavLink } from "./navbar/NavLink";
import { RecommendedStoriesList } from "./stories/RecommendedStoriesList";
import { FavouriteStoriesList } from "./stories/FavouritedStoriesList";
import "./app.css";

export const App = () => {
	return (
		<>
			<div className="header">
				<h1>
					<Link href="/">Hacker News Feed </Link>
				</h1>
				<h2 className="login">Login Placeholder!</h2>
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
			<div>
				<Route path="/">{<TopStoriesList />}</Route>
				<Route path="/top">{<TopStoriesList />}</Route>
				<Route path="/recs">{<RecommendedStoriesList />}</Route>
				<Route path="/favs">{<FavouriteStoriesList />}</Route>
			</div>
		</>
	);
};
