import { IComment } from "../interfaces/comment";
import { IStory } from "../interfaces/story";

export const getSortedStories = (stories: IStory[]): IStory[] => {
	const storiesToSort = stories.slice();
	storiesToSort.sort(
		(firstStory: IStory, secondStory: IStory) =>
			secondStory.score - firstStory.score
	);

	return storiesToSort;
};

export const getSortedComments = (comments: IComment[]): IComment[] => {
	const commentsToSort = comments.slice();
	commentsToSort.sort(
		(firstComment: IComment, secondComment: IComment) =>
			secondComment.time - firstComment.time
	);

	return commentsToSort;
};
