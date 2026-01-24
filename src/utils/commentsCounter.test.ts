import { describe, it, expect } from "vitest";
import { getRepliesCount } from "./commentsCounter";
import { IComment } from "../interfaces/comment";

describe("commentsCounter", () => {
    const createMockComment = (
        id: number,
        repliesCount: number = 0
    ): IComment => ({
        id,
        kids: Array.from({ length: repliesCount }, (_, i) => id * 100 + i),
        replyObjects: [],
        by: "",
        parent: 0,
        text: "",
        time: 0,
        type: "",
        deleted: false,
    });

    it("should count replies from root and nested comments", () => {
        const reply2 = createMockComment(2, 1); // 1 reply
        const reply3 = createMockComment(3, 0); // 0 replies

        const mockComment: IComment = {
            ...createMockComment(1, 2), // 2 replies
            replyObjects: [reply2, reply3],
        };

        const count = getRepliesCount(mockComment);
        expect(count).toBe(3); // 2 replies from root + 1 reply from reply2
    });

    it("should count only replies when both kids and replyObjects exist", () => {
        const mockComment: IComment = {
            id: 1,
            kids: [2, 3],
            replyObjects: [
                {
                    id: 2,
                    kids: [4],
                    replyObjects: [],
                    by: "",
                    parent: 0,
                    text: "",
                    time: 0,
                    type: "",
                    deleted: false,
                },
                {
                    id: 3,
                    kids: [],
                    replyObjects: [],
                    by: "",
                    parent: 0,
                    text: "",
                    time: 0,
                    type: "",
                    deleted: false,
                },
            ],
            by: "",
            parent: 0,
            text: "",
            time: 0,
            type: "",
            deleted: false,
        };

        const count = getRepliesCount(mockComment);
        expect(count).toBe(3); // counts kids: [2,3] and kids: [4], ignores replyObjects
    });

    it("should fallback to replyObjects when kids is empty", () => {
        const reply2 = createMockComment(2, 1);
        const reply3 = createMockComment(3, 0);

        const mockComment: IComment = {
            id: 1,
            kids: [], // empty kids, will use replyObjects
            replyObjects: [reply2, reply3],
            by: "",
            parent: 0,
            text: "",
            time: 0,
            type: "",
            deleted: false,
        };

        const count = getRepliesCount(mockComment);
        expect(count).toBe(3); // 2 replyObjects + 1 reply from reply2
    });
});
