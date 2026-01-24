import { describe, it, expect } from "vitest";
import { sortStories, sortComments } from "./sorter";
import { IStory } from "../interfaces/story";
import { IComment } from "../interfaces/comment";

const mockStories: IStory[] = [
    {
        id: 1,
        title: "B Story",
        score: 10,
        by: "user1",
        descendants: [],
        kids: [],
        time: 100,
        type: "story",
        url: "",
        tags: [],
    },
    {
        id: 2,
        title: "A Story",
        score: 20,
        by: "user2",
        descendants: [],
        kids: [],
        time: 200,
        type: "story",
        url: "",
        tags: [],
    },
    {
        id: 3,
        title: "C Story",
        score: 15,
        by: "user3",
        descendants: [],
        kids: [],
        time: 150,
        type: "story",
        url: "",
        tags: [],
    },
];

describe("sorter utils", () => {
    describe("sortStories", () => {
        it("should return empty array if stories are undefined", () => {
            expect(sortStories(undefined, "asc", "id", "")).toEqual([]);
        });

        it("should sort by score descending by default (if field/order logic hits fallback)", () => {
            const sorted = sortStories([...mockStories], "desc", "score", "");
            expect(sorted[0].score).toBe(20);
            expect(sorted[2].score).toBe(10);
        });

        it("should sort by score ascending", () => {
            const sorted = sortStories([...mockStories], "asc", "score", "");
            expect(sorted[0].score).toBe(10);
            expect(sorted[1].score).toBe(15);
            expect(sorted[2].score).toBe(20);
        });

        it("should sort by title descending", () => {
            const sorted = sortStories([...mockStories], "desc", "title", "");
            expect(sorted[0].title).toBe("C Story");
            expect(sorted[2].title).toBe("A Story");
        });

        it("should filter by search query", () => {
            const sorted = sortStories([...mockStories], "asc", "title", "A");
            expect(sorted).toHaveLength(1);
            expect(sorted[0].title).toBe("A Story");
        });
    });

    describe("sortComments", () => {
        it("should sort comments by time descending", () => {
            const mockComments: IComment[] = [
                {
                    id: 1,
                    time: 100,
                    by: "u1",
                    type: "comment",
                    kids: [],
                    replyObjects: [],
                    text: "t1",
                    parent: 0,
                    deleted: false,
                },
                {
                    id: 2,
                    time: 200,
                    by: "u2",
                    type: "comment",
                    kids: [],
                    replyObjects: [],
                    text: "t2",
                    parent: 0,
                    deleted: false,
                },
                {
                    id: 3,
                    time: 150,
                    by: "u3",
                    type: "comment",
                    kids: [],
                    replyObjects: [],
                    text: "t3",
                    parent: 0,
                    deleted: false,
                },
            ];

            const sorted = sortComments(mockComments);
            expect(sorted[0].time).toBe(200);
            expect(sorted[1].time).toBe(150);
            expect(sorted[2].time).toBe(100);
        });
    });
});
