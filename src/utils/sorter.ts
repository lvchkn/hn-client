import { IComment } from "../interfaces/comment";
import { IStory } from "../interfaces/story";
import { SortField, SortOrder } from "../components/processing/Processing";

export const sortStories = (
    stories: IStory[] | undefined,
    order: SortOrder,
    field: SortField,
    search: string
): IStory[] => {
    if (!stories) return [];

    const storiesToSort = stories.filter((story: IStory) =>
        story.title.toLowerCase().includes(search.toLowerCase())
    );

    storiesToSort.sort((firstStory: IStory, secondStory: IStory) => {
        if (order === "asc") {
            if (field === "id" || field === "score") {
                return firstStory[field] - secondStory[field];
            } else if (field === "title") {
                return firstStory[field].localeCompare(secondStory[field]);
            }
        } else if (order === "desc") {
            if (field === "id" || field === "score") {
                return secondStory[field] - firstStory[field];
            } else if (field === "title") {
                return secondStory[field].localeCompare(firstStory[field]);
            }
        }

        return secondStory.score - firstStory.score;
    });

    return storiesToSort;
};

export const sortComments = (comments: IComment[]): IComment[] => {
    const commentsToSort = comments.slice();
    commentsToSort.sort(
        (firstComment: IComment, secondComment: IComment) =>
            secondComment.time - firstComment.time
    );

    return commentsToSort;
};
