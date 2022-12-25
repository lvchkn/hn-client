import { Story, StoryWithComments } from "../models/story";
import { Comment } from "../models/comment";

const NUMBER_OF_STORIES_TO_SHOW = 5;

export const getStoryById = async (id: number): Promise<Story | undefined> => {
	const response: Response = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`
	);
	const story: Story = await response.json();

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

export const getTopStories = async (): Promise<Story[]> => {
	const topStoriesIds = (await getTopStoriesIds()).slice(
		0,
		NUMBER_OF_STORIES_TO_SHOW
	);
	const stories: Story[] = [];

	await Promise.all(
		topStoriesIds.map(async (id: number) => {
			const story: Story | undefined = await getStoryById(id);
			if (story) {
				stories.push(story);
			}
		})
	);

	return stories;
};

const getCommentById = async (id: number): Promise<Comment> => {
	const response: Response = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`
	);
	return response.json();
};

const enrichStoryWithTopLevelComments = async (
	story: Story
): Promise<Comment[]> => {
	const comments: Comment[] = [];

	await Promise.all(
		story.kids?.map(async (kidId: number) => {
			const comment: Comment = await getCommentById(kidId);
			if (comment && !comment.deleted) {
				comments.push(comment);
			}
		})
	);

	return comments;
};

export const mapCommentsToStories = async (
	stories: Story[]
): Promise<StoryWithComments[]> => {
	const storiesWithComments: StoryWithComments[] = [];

	await Promise.all(
		stories.map(async (story: Story) => {
			const storyWithComments: StoryWithComments =
				await mapCommentsToStory(story);

			storiesWithComments.push(storyWithComments);
		})
	);

	return storiesWithComments;
};

export const mapCommentsToStory = async (
	story: Story
): Promise<StoryWithComments> => {
	const commentsForStory: Comment[] = await enrichStoryWithTopLevelComments(
		story
	);

	return {
		storyItself: story,
		comments: commentsForStory,
		showComments: false,
	};
};
