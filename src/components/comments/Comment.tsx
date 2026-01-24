import { useState } from "react";
import { decodeHtml } from "../../utils/htmlDecoder";
import { IComment } from "../../interfaces/comment";
import { getRepliesCount } from "../../utils/commentsCounter";
import "./commentStyles.css";

export interface CommentProps {
    id: number;
    author: string;
    text: string;
    replies: IComment[];
}

export const Comment = (props: CommentProps) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isRepliesHidden, setIsRepliesHidden] = useState<boolean>(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleReplies = () => {
        setIsRepliesHidden(!isRepliesHidden);
    };

    const hasReplies = props.replies && props.replies.length > 0;

    const totalCommentsCount = getRepliesCount({
        replyObjects: props.replies ?? [],
    } as IComment);

    const replyGrammar = totalCommentsCount % 10 === 1 ? "reply" : "replies";
    const collapsedText = isCollapsed
        ? `Show comment and ${totalCommentsCount} ${replyGrammar}`
        : `${props.author}`;

    return (
        <div className={`comment-container ${isCollapsed ? "collapsed" : ""}`}>
            <div className="comment">
                <div className="collapse-line" onClick={toggleReplies}></div>

                <div className="comment-content">
                    <div className="comment-header">
                        <button
                            className="transparent-button"
                            onClick={toggleCollapse}
                        >
                            <div className="button-content">
                                <span className="circle"></span>
                                <span className="author">{collapsedText}</span>
                                {!isCollapsed && (
                                    <span className="comment-id">
                                        {props.id}
                                    </span>
                                )}
                                {isCollapsed && (
                                    <span className="collapsed-info">
                                        (collapsed)
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>

                    {!isCollapsed && (
                        <div className="comment-text">
                            {decodeHtml(props.text)}
                        </div>
                    )}
                </div>
            </div>

            {hasReplies && !isCollapsed && !isRepliesHidden && (
                <div className="replies">
                    {props.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            id={reply.id}
                            author={reply.by}
                            text={reply.text}
                            replies={reply.replyObjects}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
