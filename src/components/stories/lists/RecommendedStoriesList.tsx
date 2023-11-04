import { useQuery } from "@tanstack/react-query";
import { Story } from "../Story";
import { StoriesLoader } from "../../loader/StoriesLoader";
import { IStory } from "../../../interfaces/story";
import { getRecommendedStories } from "../../../utils/apiFetcher";

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
