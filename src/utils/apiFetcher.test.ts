import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTopStoriesFromCustomApi, traverseComments } from "./apiFetcher";

describe("apiFetcher", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    describe("getTopStories", () => {
        it("should fetch top stories and return mapped stories", async () => {
            const mockStory = {
                id: 1,
                type: "story",
                title: "Test Story",
                by: "testuser",
            };
            const mockPagedObject = {
                totalPagesCount: 1,
                stories: [mockStory],
            };

            (fetch as any).mockResolvedValueOnce({
                json: () => Promise.resolve(mockPagedObject),
                status: 200,
            });

            const pagedObject = await getTopStoriesFromCustomApi(
                "react",
                "asc",
                "score",
                1,
                5
            );

            const url = `${process.env.REACT_APP_BASE_URL}/api/stories?orderBy=score+asc&pageNumber=1&pageSize=5&search=react`;

            expect(fetch).toHaveBeenCalledWith(url, {
                credentials: "include",
            });
            expect(pagedObject.stories).toHaveLength(1);
            expect(pagedObject.stories[0].id).toBe(1);
        });
    });

    describe("traverseComments", () => {
        it("should recursively fetch comments", async () => {
            const mockComment = {
                id: 101,
                type: "comment",
                text: "Parent",
                kids: [102],
            };
            const mockChild = {
                id: 102,
                type: "comment",
                text: "Child",
                kids: [],
            };

            (fetch as any)
                .mockResolvedValueOnce({
                    json: () => Promise.resolve(mockComment),
                })
                .mockResolvedValueOnce({
                    json: () => Promise.resolve(mockChild),
                });

            const comments = await traverseComments([101]);

            expect(comments).toHaveLength(1);
            expect(comments[0].id).toBe(101);
            expect(comments[0].replyObjects).toHaveLength(1);
            expect(comments[0].replyObjects![0].id).toBe(102);
        });

        it("should handle deleted comments", async () => {
            const mockDeleted = {
                id: 103,
                type: "comment",
                deleted: true,
                time: 1234567,
                parent: 101,
            };

            (fetch as any).mockResolvedValueOnce({
                json: () => Promise.resolve(mockDeleted),
            });

            const comments = await traverseComments([103]);

            expect(comments[0].text).toBe("deleted");
            expect(comments[0].by).toBe("deleted");
            expect(comments[0].deleted).toBe(true);
        });
    });
});
