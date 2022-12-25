import { Comment } from "./comment";

export interface Story {
	by: string;
	id: number;
	descendants: number[];
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}

export interface StoryWithComments {
	storyItself: Story;
	comments: Comment[];
	showComments: boolean;
}
