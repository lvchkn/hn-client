import { useQuery } from "@tanstack/react-query";
import { getTopStoriesFromCustomApi } from "../../utils/apiFetcher";
import { IPagedObject, Tag } from "../../interfaces/story";
import { StoriesLoader } from "../loader/StoriesLoader";
import "./tagCloudStyles.css";

const MAX_STORIES = 20_000;

export const TagCloud = () => {
    const { data, isLoading } = useQuery<IPagedObject, Error>({
        queryKey: ["tagcloud", MAX_STORIES],
        queryFn: () =>
            getTopStoriesFromCustomApi("", "desc", "score", 1, MAX_STORIES),
        staleTime: 30_000 * 60,
    });

    if (isLoading) {
        return <StoriesLoader />;
    }

    const stories = data?.stories || [];
    const tagCountMap: Record<string, { count: number; id: number }> = {};

    stories.forEach((story) => {
        story.tags?.forEach((tag: Tag) => {
            if (tagCountMap[tag.name]) {
                tagCountMap[tag.name].count++;
            } else {
                tagCountMap[tag.name] = { count: 1, id: tag.id };
            }
        });
    });

    const sortedTags = Object.entries(tagCountMap).map(([name, data]) => ({
        name,
        ...data,
    }));

    if (sortedTags.length === 0) {
        return (
            <div className="tag-cloud-loading">
                No tags found in recent stories.
            </div>
        );
    }

    const maxCount = Math.max(...sortedTags.map((t) => t.count));

    const getClassName = (count: number) => {
        const ratio = count / maxCount;
        if (ratio > 0.8) return "tag-cloud-item size-xl";
        if (ratio > 0.6) return "tag-cloud-item size-lg";
        if (ratio > 0.4) return "tag-cloud-item size-md";
        if (ratio > 0.2) return "tag-cloud-item size-sm";
        return "tag-cloud-item size-xs";
    };

    return (
        <div className="tag-cloud-container">
            {sortedTags.map((tag) => (
                <span
                    key={tag.id}
                    className={getClassName(tag.count)}
                    title={`${tag.count} occurrences`}
                >
                    {tag.name}
                </span>
            ))}
        </div>
    );
};
