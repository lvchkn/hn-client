import "./app.css";
import { StoriesList } from "./stories/StoriesList";

export const App = () => {
	return (
		<>
			<h1 className="header">Top stories on Hackernews at the moment </h1>
			<StoriesList />
		</>
	);
};
