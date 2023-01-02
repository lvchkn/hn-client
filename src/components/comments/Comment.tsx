import { decodeHtml } from "../../utils/htmlDecoder";
import "./commentStyles.css";

export interface CommentProps {
	id: number;
	author: string;
	text: string;
}

export const Comment = (props: CommentProps) => {
	return (
		<ul className="comment">
			<li>{props.id}</li>
			<li>{props.author}</li>
			<li>{decodeHtml(props.text)}</li>
		</ul>
	);
};
