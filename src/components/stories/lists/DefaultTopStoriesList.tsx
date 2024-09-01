import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { StoriesList } from "./StoriesList";
import { StoriesLoader } from "../../loader/StoriesLoader";
import { Paging } from "../../processing/Paging";
import { Processing, SortField, SortOrder } from "../../processing/Processing";
import { IStory } from "../../../interfaces/story";
import { getTopStories } from "../../../utils/apiFetcher";
import { sortStories } from "../../../utils/sorter";
import { paginateStories } from "../../../utils/pager";

const PAGE_SIZE = 5;

export const DefaultTopStoriesList = () => {
    const [search, setSearch] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const [sortField, setSortField] = useState<SortField>("score");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, params] = useRoute("/top/:page");

    const pageNumber = parseInt(params?.page ?? "") || 1;

    const query = useQuery<IStory[], Error>({
        queryKey: [pageNumber],
        queryFn: getTopStories,
        staleTime: 30_000 * 60, // 30 min
    });

    const sortedStories = sortStories(query.data, sortOrder, sortField, search);
    const pagedStories = paginateStories(sortedStories, pageNumber, PAGE_SIZE);
    const totalPagesCount = Math.ceil(pagedStories.length / PAGE_SIZE);

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const handleSortOrderChange = (order: SortOrder) => {
        setSortOrder(order);
    };

    const handleSortFieldChange = (field: SortField) => {
        setSortField(field);
    };

    return (
        <>
            <Processing
                searchText={search}
                search={handleSearch}
                sortOrder={sortOrder}
                changeSortOrder={handleSortOrderChange}
                sortField={sortField}
                changeSortField={handleSortFieldChange}
            />
            {query.isFetching ? (
                <StoriesLoader />
            ) : (
                <StoriesList
                    stories={pagedStories}
                    isLoading={query.isFetching}
                />
            )}

            <Paging pageNumber={pageNumber} totalPagesCount={totalPagesCount} />
        </>
    );
};
