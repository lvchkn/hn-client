import { Story } from "../Story";
import { StoriesLoader } from "../../loader/StoriesLoader";
import { IStory } from "../../../interfaces/story";

interface StoriesListProps {
    isLoading: boolean;
    stories: IStory[] | undefined;
}

export const StoriesList = (props: StoriesListProps) => {
    return props.isLoading ? (
        <StoriesLoader />
    ) : (
        props.stories?.map((story) => {
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
        })
    );
};
