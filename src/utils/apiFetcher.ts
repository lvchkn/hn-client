import { IPagedObject, IStory } from "../interfaces/story";
import { IComment } from "../interfaces/comment";
import { SortField, SortOrder } from "../components/processing/Processing";

const NUMBER_OF_STORIES_TO_SHOW = 50;
type Item = IComment | IStory | null;

const isObject = (param: unknown): param is Record<string, unknown> =>
    param !== null && typeof param === "object";

const isStory = (item: Item): item is IStory =>
    isObject(item) &&
    (item as IStory).type === "story" &&
    typeof (item as IStory).id === "number";

const isComment = (item: Item): item is IComment =>
    isObject(item) &&
    (item as IComment).type === "comment" &&
    typeof (item as IComment).id === "number";

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
    const fallback = {
        totalPagesCount: 0,
        stories: [],
    };

    try {
        const params = new URLSearchParams({
            orderBy: `${sortField} ${sortOrder}`,
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString(),
            search: search,
        });

        const response: Response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/stories?${params}`,
            { credentials: "include" }
        );

        const result = response.status < 400 ? await response.json() : fallback;

        return result;
    } catch {
        return fallback;
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

export const traverseComments = async (
    replies: number[]
): Promise<IComment[]> => {
    if (!replies || replies.length === 0) {
        return [];
    }

    return await Promise.all(
        replies.map(async (replyId: number) => {
            const item: Item = await getItemById(replyId);
            if (item && isComment(item) && !item.deleted && item.kids) {
                item.replyObjects = await traverseComments(item.kids);
                return item;
            }

            if (item && isComment(item) && item.deleted) {
                return {
                    id: item.id,
                    by: "deleted",
                    type: "comment",
                    time: item.time,
                    kids: [],
                    replyObjects: [],
                    parent: item.parent,
                    deleted: true,
                    text: "deleted",
                };
            }
            return <IComment>item;
        })
    );
};
