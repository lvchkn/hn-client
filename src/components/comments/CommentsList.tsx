import { useQuery } from "@tanstack/react-query";
import { IComment } from "../../interfaces/comment";
import { getCommentsForStory } from "../../utils/apiFetcher";
import { getSortedComments } from "../../utils/sorter";
import { Comment } from "./Comment";

export interface CommentsListProps {
	storyId: number;
}

export const CommentsList = (props: CommentsListProps) => {
	const query = useQuery<IComment[], Error>({
		queryKey: [props.storyId],
		queryFn: () => getCommentsForStory(props.storyId),
	});

	const sortedComments = query.data && getSortedComments(query.data);

	return (
		<>
			{sortedComments?.map((comment: IComment) => {
				const { id, by, text } = comment;

				return (
					<Comment key={id} id={id} author={by} text={text}></Comment>
				);
			})}
		</>
	);
};
