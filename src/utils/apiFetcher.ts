import { IStory } from "../interfaces/story";
import { IComment } from "../interfaces/comment";

const NUMBER_OF_STORIES_TO_SHOW = 5;

const getStoryById = async (id: number): Promise<IStory | undefined> => {
	const response: Response = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`
	);
	const story: IStory = await response.json();

	if (story && "type" in story && story.type === "story") {
		return story;
	}

	return undefined;
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
			const story: IStory | undefined = await getStoryById(id);
			if (story) {
				stories.push(story);
			}
		})
	);

	return stories;
};

const getCommentById = async (id: number): Promise<IComment> => {
	const response: Response = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`
	);
	return response.json();
};

const enrichStoryWithTopLevelComments = async (
	story: IStory
): Promise<IComment[]> => {
	const comments: IComment[] = [];

	await Promise.all(
		story.kids?.map(async (kidId: number) => {
			const comment: IComment = await getCommentById(kidId);
			if (comment && !comment.deleted) {
				comments.push(comment);
			}
		})
	);

	return comments;
};

export const getCommentsForStory = async (
	storyId: number
): Promise<IComment[]> => {
	const story: IStory | undefined = await getStoryById(storyId);

	if (!story) throw "No story found";

	const commentsForStory: IComment[] = await enrichStoryWithTopLevelComments(
		story
	);

	return commentsForStory;
};
