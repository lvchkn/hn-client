import { Story } from "../models/story";

export const getSortedStories = (stories: Story[]): Story[] => {
	const storiesToSort = stories.slice();
	storiesToSort.sort(
		(firstStory: Story, secondStory: Story) =>
			secondStory.score - firstStory.score
	);

	return storiesToSort;
};
