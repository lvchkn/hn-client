import { useQuery } from "@tanstack/react-query";
import { Story } from "./Story";
import { getRecommendedStories } from "../../utils/apiFetcher";
import { IStory } from "../../interfaces/story";
import { StoriesLoader } from "../loader/StoriesLoader";

export const RecommendedStoriesList = () => {
    const query = useQuery<IStory[], Error>({
        queryKey: ["getRecommendedStories"],
        queryFn: getRecommendedStories,
    });

    const sortedStories = query.data;

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
