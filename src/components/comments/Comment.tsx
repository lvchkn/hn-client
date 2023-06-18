import { useState } from "react";
import { decodeHtml } from "../../utils/htmlDecoder";
import { IComment } from "../../interfaces/comment";
import { getKidCommentsCount } from "../../utils/commentsCounter";
import "./commentStyles.css";

export interface CommentProps {
	id: number;
	author: string;
	text: string;
	kidComments: IComment[];
}

export const Comment = (props: CommentProps) => {
	const [showCommentsTree, setShowCommentsTree] = useState<boolean>(true);

	const handleShowCommentsTreeChange = () => {
		setShowCommentsTree(!showCommentsTree);
	};

	const commentsCount = getKidCommentsCount({
		kidComments: props.kidComments ?? [],
	} as IComment);

	const replyGrammar = commentsCount % 10 === 1 ? "reply" : "replies";
	const closedCommentsTreeText = `Show comment and ${commentsCount} ${replyGrammar}`;

	return showCommentsTree ? (
		<div>
			<button
				className="transparent-button"
				onClick={handleShowCommentsTreeChange}
			>
				<div className="button-content">
					<div className="circle "></div>
					<span className="author">
						{props.author} ({props.id})
					</span>
				</div>
			</button>

			<div className="comment-text">{decodeHtml(props.text)}</div>

			{props.kidComments?.map((kid) => {
				return (
					<div key={kid.id} className="kid-comment">
						<Comment
							key={kid.id}
							id={kid.id}
							author={kid.by}
							text={kid.text}
							kidComments={kid.kidComments}
						/>
					</div>
				);
			})}
		</div>
	) : (
		<div>
			<button
				className="transparent-button"
				onClick={handleShowCommentsTreeChange}
			>
				<div className="button-content">
					<div className="circle"></div>
					<span className="author">{closedCommentsTreeText}</span>
				</div>
			</button>
		</div>
	);
};
