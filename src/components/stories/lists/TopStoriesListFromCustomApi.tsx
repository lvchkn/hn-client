import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { StoriesList } from "./StoriesList";
import { Paging } from "../../processing/Paging";
import { Processing, SortField, SortOrder } from "../../processing/Processing";
import { IPagedObject } from "../../../interfaces/story";
import { getTopStoriesFromCustomApi } from "../../../utils/apiFetcher";

const PAGE_SIZE = 5;

export const TopStoriesListFromCustomApi = () => {
    const [search, setSearch] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const [sortField, setSortField] = useState<SortField>("score");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, params] = useRoute("/top/:page");

    const pageNumber = parseInt(params?.page ?? "") || 1;

    const query = useQuery<IPagedObject, Error>({
        queryKey: [search, sortOrder, sortField, pageNumber],
        queryFn: () =>
            getTopStoriesFromCustomApi(
                search,
                sortOrder,
                sortField,
                pageNumber,
                PAGE_SIZE
            ),
        staleTime: 30_000 * 60, // 30 min
    });

    const totalPagesCount = query.data?.totalPagesCount || 0;

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
            <StoriesList
                stories={query.data?.stories}
                isLoading={query.isFetching}
            />

            <Paging pageNumber={pageNumber} totalPagesCount={totalPagesCount} />
        </>
    );
};
