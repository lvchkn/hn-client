import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "./Comment";
import { IComment } from "../../interfaces/comment";
import { traverseComments } from "../../utils/apiFetcher";
import { sortComments } from "../../utils/sorter";

export interface CommentsListProps {
    storyId: number;
    kids: number[];
    showComments: boolean;
    handleLoadingStatusChange: (isLoading: boolean) => void;
}

export const CommentsList = (props: CommentsListProps) => {
    const query = useQuery<IComment[], Error>({
        queryKey: [props.storyId],
        queryFn: () => traverseComments(props.kids),
        enabled: props.showComments,
        staleTime: 300_000,
    });

    const sortedComments = query.data && sortComments(query.data);

    useEffect(() => {
        props.handleLoadingStatusChange(query.isLoading);
    });

    return (
        <>
            {sortedComments?.map((comment: IComment) => {
                const { id, by, text, kidComments } = comment;

                return (
                    <Comment
                        key={id}
                        id={id}
                        author={by}
                        text={text}
                        kidComments={kidComments}
                    ></Comment>
                );
            })}
        </>
    );
};
