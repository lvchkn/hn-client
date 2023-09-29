import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Story } from "./Story";
import { StoriesLoader } from "../loader/StoriesLoader";
import { Paging } from "../processing/Paging";
import { Processing, SortField, SortOrder } from "../processing/Processing";
import { IStory } from "../../interfaces/story";
import {
    getTopStories,
    getTopStoriesFromCustomApi,
} from "../../utils/apiFetcher";
import { sortStories } from "../../utils/sorter";

const PAGE_SIZE = 2;

export const TopStoriesList = () => {
    const [search, setSearch] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const [sortField, setSortField] = useState<SortField>("score");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, params] = useRoute("/top/:page");

    const pageNumber = parseInt(params?.page ?? "") || 1;

    const query = useQuery<IStory[], Error>({
        queryKey: [search, sortOrder, sortField, pageNumber],
        queryFn: process.env.REACT_APP_USE_CUSTOM_API
            ? () =>
                  getTopStoriesFromCustomApi(
                      search,
                      sortOrder,
                      sortField,
                      pageNumber,
                      PAGE_SIZE
                  )
            : getTopStories,
        staleTime: 3_000,
    });

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const handleSortOrderChange = (order: SortOrder) => {
        setSortOrder(order);
    };

    const handleSortFieldChange = (field: SortField) => {
        setSortField(field);
    };

    const processedData = process.env.REACT_APP_USE_CUSTOM_API
        ? query.data
        : sortStories(query.data, sortOrder, sortField, search);

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
            {query.isFetched ? (
                processedData?.map((story) => {
                    const { id, score, title, url, kids } = story;

                    return (
                        <div key={id}>
                            <Story
                                id={id}
                                score={score}
                                title={title}
                                url={url}
                                kids={kids}
                            ></Story>
                            <hr></hr>
                        </div>
                    );
                })
            ) : (
                <StoriesLoader />
            )}

            <Paging pageNumber={pageNumber} />
        </>
    );
};
