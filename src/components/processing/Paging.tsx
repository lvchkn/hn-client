import { NavLink } from "../navbar/NavLink";
import "./paging.css";

interface PagingProps {
    pageNumber: number;
}

const getCharactersForDisplay = (currentPage: number): (number | string)[] => {
    const firstPage = 1;
    if (currentPage < firstPage) return [];

    const numbers: (number | string)[] = [];

    const numberOfAdjacentPages = 2;

    for (
        let i = currentPage - numberOfAdjacentPages;
        i <= currentPage + numberOfAdjacentPages;
        i++
    ) {
        if (i >= firstPage) {
            numbers.push(i);
        }
    }

    if (currentPage === firstPage) return numbers;
    if (currentPage > firstPage) {
        numbers.unshift("<");
        return numbers;
    }

    return numbers;
};

export const Paging = (props: PagingProps) => {
    return (
        <span>
            {getCharactersForDisplay(props.pageNumber).map((n) => {
                return (
                    <NavLink
                        href={`/top/${
                            parseInt(n.toString()) || props.pageNumber - 1
                        }`}
                        className="tab"
                        key={n}
                        isDefaultPage={true}
                    >
                        <button className="page-button" type="submit">
                            {n}
                        </button>
                    </NavLink>
                );
            })}
            <NavLink
                href={`/top/${props.pageNumber + 1}`}
                className="tab"
                isDefaultPage={true}
            >
                <button className="page-button" type="submit">
                    {">"}
                </button>
            </NavLink>
        </span>
    );
};
