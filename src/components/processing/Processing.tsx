import { ChangeEvent, useState } from "react";
import "./processing.css";

interface ProcessingProps {
    searchText: string;
    search: (search: string) => void;
    sortOrder: SortOrder;
    changeSortOrder: (order: SortOrder) => void;
    sortField: SortField;
    changeSortField: (field: SortField) => void;
}

export type SortOrder = "asc" | "desc";
export type SortField = "score" | "title" | "id";

export const Processing = (props: ProcessingProps) => {
    const {
        searchText,
        search,
        sortOrder,
        changeSortOrder,
        sortField,
        changeSortField,
    } = props;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        search(e.target.value);
    };

    const handleSortFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
        changeSortField(e.target.value as SortField);
    };

    const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        changeSortOrder(e.target.value as SortOrder);
    };

    const handleExpandOptions = () => {
        setIsExpanded(!isExpanded);
    };

    const optionsText = (isExpanded ? "Collapse" : "Expand") + " options";

    return (
        <div className="options-panel">
            <button
                className="options-panel-button"
                onClick={handleExpandOptions}
            >
                {optionsText}
            </button>
            {isExpanded ? (
                <>
                    <div className="options-panel-content">
                        <span className="search">
                            <label htmlFor="search">Search:</label>
                            <input
                                id="search"
                                type="text"
                                onChange={handleSearch}
                                value={searchText}
                                className="search-input"
                            />
                        </span>
                        <span className="sort-field">
                            <label htmlFor="sortField">Sort by field:</label>
                            <select
                                id="sortField"
                                name="fields"
                                onChange={handleSortFieldChange}
                                className="sort-field-select"
                                value={sortField}
                            >
                                <option value="score">Score</option>
                                <option value="id">Id</option>
                                <option value="title">Title</option>
                            </select>
                        </span>
                        <span className="sort-order">
                            <label htmlFor="sortOrder">Sort by order:</label>
                            <select
                                id="sortOrder"
                                name="order"
                                onChange={handleSortOrderChange}
                                className="sort-order-select"
                                value={sortOrder}
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
