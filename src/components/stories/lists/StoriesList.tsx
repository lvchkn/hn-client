import { Story } from "../Story";
import { IStory } from "../../../interfaces/story";

interface StoriesListProps {
    stories: IStory[];
}

export const StoriesList = (props: StoriesListProps) => {
    const { stories } = props;

    return stories.map((story) => {
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
    });
};
