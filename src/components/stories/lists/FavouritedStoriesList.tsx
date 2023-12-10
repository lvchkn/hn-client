import { useQuery } from "@tanstack/react-query";
import { Story } from "../Story";
import { StoriesLoader } from "../../loader/StoriesLoader";
import { IStory } from "../../../interfaces/story";
import { getFavouriteStories } from "../../../utils/apiFetcher";

export const FavouriteStoriesList = () => {
    const query = useQuery<IStory[], Error>({
        queryKey: ["getFavouriteStories"],
        queryFn: getFavouriteStories,
    });

    const sortedStories = query.data;

    return query.isFetched ? (
        <>
            {sortedStories?.map((story) => {
                const { id, score, title, url, kids, tags } = story;

                return (
                    <div key={id}>
                        <Story
                            id={id}
                            score={score}
                            title={title}
                            url={url}
                            kids={kids}
                            tags={tags}
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
