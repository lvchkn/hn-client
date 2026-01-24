import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { StoriesList } from "./StoriesList";
import { StoriesLoader } from "../../loader/StoriesLoader";
import { Paging } from "../../processing/Paging";
import { SortField, SortOrder } from "../../processing/Processing";
import { getTopStoriesFromCustomApi } from "../../../utils/apiFetcher";
import { IPagedObject } from "../../../interfaces/story";

export interface ITopStoriesListProps {
    search: string;
    sortField: SortField;
    sortOrder: SortOrder;
}
const PAGE_SIZE = 5;

export const TopStoriesList = (props: ITopStoriesListProps) => {
    const { search, sortOrder, sortField } = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, params] = useRoute("/top/:page");

    const pageNumber = parseInt(params?.page ?? "") || 1;

    const query = useQuery<IPagedObject, Error>({
        queryKey: [search, sortOrder, sortField, pageNumber, PAGE_SIZE],
        queryFn: () =>
            getTopStoriesFromCustomApi(
                search,
                sortOrder,
                sortField,
                pageNumber,
                PAGE_SIZE
            ),
        staleTime: 30_000 * 60,
    });

    const pagesCount = query.data?.totalPagesCount || 0;
    const stories = query.data?.stories || [];

    return query.isLoading ? (
        <StoriesLoader />
    ) : (
        <>
            <StoriesList stories={stories} />
            {<Paging pageNumber={pageNumber} totalPagesCount={pagesCount} />}
        </>
    );
};
