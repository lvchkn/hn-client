import { IStory } from "../interfaces/story";

export const paginateStories = (
    stories: IStory[] | undefined,
    currentPageNumber: number,
    pageSize: number
): IStory[] => {
    if (!stories) return [];

    const skip = (currentPageNumber - 1) * pageSize;
    const pagedStories = stories.slice(skip, skip + pageSize);

    return pagedStories;
};
