import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "./Comment";
import { IComment } from "../../interfaces/comment";
import { traverseComments } from "../../utils/apiFetcher";
import { sortComments } from "../../utils/sorter";

export interface CommentsListProps {
    storyId: number;
    replies: number[];
    showComments: boolean;
    handleLoadingStatusChange: (isLoading: boolean) => void;
}

export const CommentsList = (props: CommentsListProps) => {
    const { storyId, replies, showComments, handleLoadingStatusChange } = props;

    const query = useQuery<IComment[], Error>({
        queryKey: [storyId, replies],
        queryFn: () => traverseComments(replies),
        enabled: showComments,
        staleTime: 30_000 * 60,
    });

    const sortedComments = query.data && sortComments(query.data);

    useEffect(() => {
        handleLoadingStatusChange(query.isLoading);
    }, [query.isLoading, handleLoadingStatusChange]);

    return (
        <>
            {sortedComments?.map((comment: IComment) => {
                const { id, by, text, replyObjects } = comment;

                return (
                    <Comment
                        key={id}
                        id={id}
                        author={by}
                        text={text}
                        replies={replyObjects}
                    ></Comment>
                );
            })}
        </>
    );
};
