import { ChangeEvent, useState } from "react";
import "./processing.css";

interface ProcessingProps {
    search: (search: string) => void;
    changeSortOrder: (order: SortOrder) => void;
    changeSortField: (field: SortField) => void;
}

export type SortOrder = "asc" | "desc";
export type SortField = "score" | "title" | "id";

export const Processing = (props: ProcessingProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        props.search(e.target.value);
    };

    const handleSortFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.changeSortField(e.target.value as SortField);
    };

    const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.changeSortOrder(e.target.value as SortOrder);
    };

    const handle = () => {
        setIsExpanded(!isExpanded);
    };

    const optionsText = (isExpanded ? "Collapse" : "Expand") + " options";

    return (
        <div className="options-panel">
            <button className="options-panel-button" onClick={handle}>
                {optionsText}
            </button>
            {isExpanded ? (
                <>
                    <div className="options-panel-content">
                        <span className="search">
                            <label htmlFor="search">Search:</label>
                            <input
                                type="text"
                                onChange={handleSearch}
                                defaultValue=""
                                className="search-input"
                            />
                        </span>
                        <span className="sort-field">
                            <label htmlFor="sortField">Sort by field:</label>
                            <select
                                name="fields"
                                id="fields"
                                onChange={handleSortFieldChange}
                                className="sort-field-select"
                                defaultValue={"score"}
                            >
                                <option value="score">Score</option>
                                <option value="id">Id</option>
                                <option value="title">Title</option>
                            </select>
                        </span>
                        <span className="sort-order">
                            <label htmlFor="sortOrder">Sort by order:</label>
                            <select
                                name="order"
                                id="order"
                                onChange={handleSortOrderChange}
                                className="sort-order-select"
                                defaultValue={"desc"}
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </span>
                    </div>
                    <hr className="line"></hr>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};
