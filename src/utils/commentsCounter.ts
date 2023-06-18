import { IComment } from "../interfaces/comment";

export const getKidCommentsCount = (comment: IComment): number => {
	let counter = comment.kidComments.length;
	const stack = [comment];

	while (stack.length > 0) {
		const currentComment = stack.pop();
		counter += currentComment?.kids?.length ?? 0;

		currentComment?.kidComments?.forEach((kid) => {
			stack.push(kid);
		});
	}

	return counter;
};
