import { useQuery } from "@tanstack/react-query";
import { IStory } from "../../interfaces/story";
import { getTopStories } from "../../utils/apiFetcher";
import { getSortedStories } from "../../utils/sorter";
import { Story } from "./Story";

export const StoriesList = () => {
	const query = useQuery<IStory[], Error>({
		queryKey: ["getTopStories"],
		queryFn: getTopStories,
	});

	const sortedStories = query.data && getSortedStories(query.data);

	return (
		<>
			{sortedStories?.map((story) => {
				const { id, score, title, url } = story;

				return (
					<div key={id}>
						<Story
							id={id}
							score={score}
							title={title}
							url={url}
						></Story>
						<hr></hr>
					</div>
				);
			})}
		</>
	);
};
