import { NavLink } from "../navbar/NavLink";
import "./paging.css";

interface PagingProps {
    pageNumber: number;
    totalPagesCount: number;
}

const getCharactersForDisplay = (
    currentPageNumber: number,
    totalPagesCount: number
): (number | string)[] => {
    const firstPageNumber = 1;
    if (currentPageNumber < firstPageNumber) return [];

    const leftArrows: string[] = [];
    let numberOfPreviousPages = 0;

    if (currentPageNumber > 1) {
        numberOfPreviousPages = 1;
        leftArrows.unshift("<");
    }

    if (currentPageNumber > 2) {
        numberOfPreviousPages = 2;
        leftArrows.unshift("<<");
    }

    const rightArrows: string[] = [];
    let numberOfSubsequentPages = 0;

    if (totalPagesCount - currentPageNumber >= 1) {
        numberOfSubsequentPages = 1;
        rightArrows.push(">");
    }

    if (totalPagesCount - currentPageNumber >= 2) {
        numberOfSubsequentPages = 2;
        rightArrows.push(">>");
    }

    const numbers: number[] = [];

    for (
        let i = currentPageNumber - numberOfPreviousPages;
        i <= currentPageNumber + numberOfSubsequentPages;
        i++
    ) {
        if (i >= firstPageNumber && i <= totalPagesCount) {
            numbers.push(i);
        }
    }

    const resultChars = [...leftArrows, ...numbers, ...rightArrows];

    return resultChars;
};

export const Paging = (props: PagingProps) => {
    const getPageNumberForLink = (n: number | string): number => {
        if (typeof n === "number") return n;

        switch (n) {
            case "<":
                return props.pageNumber - 1;
            case "<<":
                return 1;
            case ">":
                return props.pageNumber + 1;
            case ">>":
                return props.totalPagesCount;

            default:
                return 0;
        }
    };

    return (
        <span>
            {getCharactersForDisplay(
                props.pageNumber,
                props.totalPagesCount
            ).map((n) => {
                let className = "page-button";
                if (n === props.pageNumber) className += " selected";

                const linkToPageNumber = getPageNumberForLink(n);

                return (
                    <NavLink
                        href={`/top/${linkToPageNumber}`}
                        key={n}
                        isDefaultPage={true}
                    >
                        <button className={className} type="submit">
                            {n}
                        </button>
                    </NavLink>
                );
            })}
        </span>
    );
};
