import { describe, it, expect } from "vitest";
import { decodeHtml } from "./htmlDecoder";

describe("htmlDecoder", () => {
    it("should decode basic HTML entities", () => {
        const input =
            "Here&#x27;s a &quot;story&quot; &amp; you can check it out.";
        const expected = 'Here\'s a "story" & you can check it out.';
        expect(decodeHtml(input)).toBe(expected);
    });

    it("should return original text if no entities", () => {
        const input = "Just plain text";
        expect(decodeHtml(input)).toBe(input);
    });
});
