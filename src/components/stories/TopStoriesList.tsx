import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Story } from "./Story";
import { StoriesLoader } from "../loader/StoriesLoader";
import { Processing, SortField, SortOrder } from "../processing/Processing";
import { IStory } from "../../interfaces/story";
import {
    getTopStories,
    getTopStoriesFromCustomApi,
} from "../../utils/apiFetcher";
import { sortStories } from "../../utils/sorter";

export const TopStoriesList = () => {
    const [search, setSearch] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const [sortField, setSortField] = useState<SortField>("score");

    const query = useQuery<IStory[], Error>({
        queryKey: [search, sortOrder, sortField],
        queryFn: process.env.REACT_APP_USE_HN_API
            ? () => getTopStories()
            : () => getTopStoriesFromCustomApi(search, sortOrder, sortField),
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

    const processedData = process.env.REACT_APP_USE_HN_API
        ? sortStories(query.data, sortOrder, sortField, search)
        : query.data;

    return (
        <>
            <Processing
                search={handleSearch}
                changeSortOrder={handleSortOrderChange}
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
        </>
    );
};
