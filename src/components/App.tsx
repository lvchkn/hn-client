import React, { useEffect, useState } from "react";
import { Comment } from "../models/comment";
import { Story, StoryWithComments } from "../models/story";
import { getTopStories, mapCommentsToStory } from "../utils/apiFetcher";
import { decodeHtml } from "../utils/htmlDecoder";
import { getSortedStories } from "../utils/sorter";
import "./app.css";

export const App = () => {
	const [stories, setStories] = useState<Story[]>([]);
	const [storiesWithComments, setStoriesWithComments] = useState<
		StoryWithComments[]
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			const savedStories = localStorage.getItem("TopStories");

			if (savedStories && savedStories.length > 0) {
				const topStories: Story[] = JSON.parse(savedStories);
				setStories(topStories);
			} else {
				const topStories: Story[] = await getTopStories();
				setStories(topStories);
				localStorage.setItem("TopStories", JSON.stringify(topStories));
			}
		};

		fetchData();
	}, []);

	const showCommentsHandler = async (
		event: React.MouseEvent<HTMLButtonElement>,
		storyId: number
	): Promise<void> => {
		const story: Story | undefined = stories.find(
			(s: Story) => s.id === storyId
		);

		if (!story) return;

		const filteredStoriesWithComments: StoryWithComments[] =
			storiesWithComments.filter(
				(s: StoryWithComments) => s.storyItself.id !== storyId
			);

		if ((event.target as HTMLButtonElement).value === "Show") {
			const storyWithComments: StoryWithComments =
				await mapCommentsToStory(story);

			setStoriesWithComments([
				...filteredStoriesWithComments,
				{
					...storyWithComments,
					showComments: true,
				},
			]);

			return;
		}

		setStoriesWithComments([
			...filteredStoriesWithComments,
			{
				storyItself: story,
				comments: [],
				showComments: false,
			},
		]);
	};

	const getCommentsForStory = (story: Story): JSX.Element => {
		const comments: Comment[] =
			storiesWithComments.find(
				(storyWithComments: StoryWithComments) =>
					storyWithComments.storyItself.id === story.id
			)?.comments ?? [];

		return (
			<ul key={story.id}>
				{comments?.map((comment: Comment) => {
					return (
						<div key={comment.id} className="comment">
							<li>Id: {comment.id}</li>
							<li>Author: {comment.by}</li>
							<li>Text: {decodeHtml(comment.text)}</li>
						</div>
					);
				})}
			</ul>
		);
	};

	const getStoriesList = (): JSX.Element[] => {
		const sortedStories: Story[] = getSortedStories(stories);

		return sortedStories.map((story: Story) => {
			const shouldShowComments: boolean =
				storiesWithComments.find(
					(storyWithComments: StoryWithComments) =>
						storyWithComments.storyItself.id === story.id
				)?.showComments ?? false;

			return (
				<ul key={story.id}>
					<li>This story has scored {story.score} points so far!</li>
					<li>{story.title}</li>
					<li>
						<a
							href={story.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{story.url}
						</a>
						{shouldShowComments ? (
							<div>
								<button
									className="showCommentsToggle"
									value="Hide"
									onClick={(e) =>
										showCommentsHandler(e, story.id)
									}
								>
									Hide comments
								</button>
								{getCommentsForStory(story)}
							</div>
						) : (
							<div>
								<button
									className="showCommentsToggle"
									value="Show"
									onClick={(e) =>
										showCommentsHandler(e, story.id)
									}
								>
									Show comments
								</button>
							</div>
						)}
					</li>
					<hr></hr>
				</ul>
			);
		});
	};

	return (
		<>
			<h1 className="header">Top stories on Hackernews at the moment </h1>
			<div>{getStoriesList()}</div>
		</>
	);
};
