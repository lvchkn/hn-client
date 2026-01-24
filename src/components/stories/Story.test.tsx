import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Story } from "./Story";
import "@testing-library/jest-dom/vitest";

vi.mock("../comments/CommentsList", () => ({
    CommentsList: () => <div data-testid="comments-list">Mocked Comments</div>,
}));

describe("Story Component", () => {
    const mockProps = {
        id: 1,
        score: 100,
        title: "Test Hacker News Story",
        url: "https://example.com",
        kids: [101, 102],
        tags: [
            { id: 1, name: "react" },
            { id: 2, name: "testing" },
        ],
    };

    it("should render story details correctly", () => {
        render(<Story {...mockProps} />);

        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.url)).toBeInTheDocument();
        expect(screen.getByText("100 points")).toBeInTheDocument();
        expect(screen.getByText("react")).toBeInTheDocument();
        expect(screen.getByText("testing")).toBeInTheDocument();
    });

    it("should toggle comments when button is clicked", () => {
        render(<Story {...mockProps} />);

        const toggleButton = screen.getByText("Show comments");
        expect(screen.queryByTestId("comments-list")).not.toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(screen.getByText("Hide comments")).toBeInTheDocument();
        expect(screen.getByTestId("comments-list")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Hide comments"));
        expect(screen.queryByTestId("comments-list")).not.toBeInTheDocument();
    });
});
