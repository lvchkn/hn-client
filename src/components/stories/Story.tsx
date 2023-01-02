import { useState } from "react";
import { CommentsList } from "../comments/CommentsList";
import "./storyStyles.css";

export interface StoryProps {
	id: number;
	score: number;
	title: string;
	url: string;
}

export const Story = (props: StoryProps) => {
	const [showComments, setShowComments] = useState<boolean>(false);
	const buttonText = showComments ? "Hide comments" : "Show comments";

	const showCommentsHandler = () => {
		setShowComments(!showComments);
	};

	return (
		<ul>
			<li>This story has scored {props.score} points so far!</li>
			<li>{props.title}</li>
			<li>
				<a href={props.url} target="_blank" rel="noopener noreferrer">
					{props.url}
				</a>
			</li>
			<button
				onClick={showCommentsHandler}
				className="showCommentsToggle"
			>
				{buttonText}
			</button>
			{showComments && <CommentsList storyId={props.id}></CommentsList>}
		</ul>
	);
};
