import { useQuery } from "@tanstack/react-query";
import { Story } from "./Story";
import { IStory } from "../../interfaces/story";
import { getFavouriteStories } from "../../utils/apiFetcher";
import { getSortedStories } from "../../utils/sorter";
import { StoriesLoader } from "../loader/StoriesLoader";

export const FavouriteStoriesList = () => {
    const query = useQuery<IStory[], Error>({
        queryKey: ["getFavouriteStories"],
        queryFn: getFavouriteStories,
    });

    const sortedStories = query.data && getSortedStories(query.data);

    return query.isFetched ? (
        <>
            {sortedStories?.map((story) => {
                const { id, score, title, url, kids } = story;

                return (
                    <div key={id}>
                        <Story
                            id={id}
                            score={score}
                            title={title}
                            url={url}
                            kids={kids}
                        ></Story>
                        <hr></hr>
                    </div>
                );
            })}
        </>
    ) : (
        <StoriesLoader />
    );
};
