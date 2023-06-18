import { useState } from "react";
import { CommentsList } from "../comments/CommentsList";
import "./storyStyles.css";

export interface StoryProps {
    id: number;
    score: number;
    title: string;
    url: string;
    kids: number[];
}

export const Story = (props: StoryProps) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const buttonText = isLoading
        ? "Loading..."
        : showComments
        ? "Hide comments"
        : "Show comments";

    const handleShowCommentsClick = () => {
        setShowComments(!showComments);
    };

    const handleLoadingStatusChange = (loadingState: boolean) => {
        setLoading(loadingState);
    };

    return (
        <>
            <ul>
                <li>{props.title}</li>
                <li>
                    <a
                        href={props.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {props.url}
                    </a>
                </li>
                <li>{props.score} points</li>
            </ul>

            <button
                onClick={handleShowCommentsClick}
                className="show-comments-toggle"
            >
                {buttonText}
            </button>

            {showComments && (
                <CommentsList
                    storyId={props.id}
                    kids={props.kids}
                    handleLoadingStatusChange={handleLoadingStatusChange}
                    showComments={showComments}
                ></CommentsList>
            )}
        </>
    );
};
