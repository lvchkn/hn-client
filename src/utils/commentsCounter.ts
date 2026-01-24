import { IComment } from "../interfaces/comment";

export const getRepliesCount = (comment: IComment): number => {
    let counter = 0;
    const stack = [comment];

    while (stack.length > 0) {
        const currentComment = stack.pop();
        if (!currentComment) continue;

        const kidsCount = currentComment.kids?.length ?? 0;
        const repliesCount = currentComment.replyObjects?.length ?? 0;

        const currentLevelCount = kidsCount > 0 ? kidsCount : repliesCount;

        counter += currentLevelCount;

        currentComment.replyObjects?.forEach((reply) => {
            stack.push(reply);
        });
    }

    return counter;
};
