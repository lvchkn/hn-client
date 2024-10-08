import { IPagedObject, IStory } from "../interfaces/story";
import { IComment } from "../interfaces/comment";
import { SortField, SortOrder } from "../components/processing/Processing";

const NUMBER_OF_STORIES_TO_SHOW = 50;
type Item = IComment | IStory;

const isStory = (item: Item): item is IStory => {
    return (item as IStory) !== undefined;
};

const isComment = (item: Item): item is IComment => {
    return (item as IComment) !== undefined;
};

const getItemById = async (id: number): Promise<Item> => {
    const response: Response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    const item: Item = await response.json();

    return item;
};

const getTopStoriesIds = async (): Promise<number[]> => {
    const response: Response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    return response.json();
};

export const getTopStories = async (): Promise<IStory[]> => {
    const topStoriesIds = (await getTopStoriesIds()).slice(
        0,
        NUMBER_OF_STORIES_TO_SHOW
    );
    const stories: IStory[] = [];

    await Promise.all(
        topStoriesIds.map(async (id: number) => {
            const item: Item = await getItemById(id);
            if (isStory(item)) {
                stories.push(item);
            }
        })
    );

    return stories;
};

export const getTopStoriesFromCustomApi = async (
    search: string,
    sortOrder: SortOrder,
    sortField: SortField,
    pageNumber: number,
    pageSize: number
): Promise<IPagedObject> => {
    try {
        const response: Response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/stories?orderBy=${sortField} ${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`,
            { credentials: "include" }
        );
        const result = response.status < 400 ? response.json() : [];
        return result;
    } catch {
        return {
            totalPagesCount: 0,
            stories: [],
        };
    }
};

export const getRecommendedStories = async (): Promise<IStory[]> => {
    return [
        {
            by: "Developer",
            id: 0,
            descendants: [],
            kids: [],
            score: 0,
            time: 0,
            title: "Recommended stories feature coming soon! (hopefully)",
            type: "story",
            url: "http://localhost:8080",
            tags: [],
        },
    ];
};

export const getFavouriteStories = async (): Promise<IStory[]> => {
    return [
        {
            by: "Developer",
            id: 0,
            descendants: [],
            kids: [],
            score: 0,
            time: 0,
            title: "Favourite stories feature coming soon! (hopefully)",
            type: "story",
            url: "http://localhost:8080",
            tags: [],
        },
    ];
};

export const traverseComments = async (kids: number[]): Promise<IComment[]> => {
    if (!kids || kids.length === 0) {
        return [];
    }

    return await Promise.all(
        kids.map(async (kidId: number) => {
            const item: Item = await getItemById(kidId);
            if (item && isComment(item) && !item.deleted && item.kids) {
                item.kidComments = await traverseComments(item.kids);
                return item;
            }

            if (item && isComment(item) && item.deleted) {
                return {
                    id: item.id,
                    by: "deleted",
                    type: "comment",
                    time: item.time,
                    kids: [],
                    kidComments: [],
                    parent: item.parent,
                    deleted: true,
                    text: "deleted",
                };
            }
            return <IComment>item;
        })
    );
};
