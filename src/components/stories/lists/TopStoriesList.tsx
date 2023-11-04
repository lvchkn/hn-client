import { DefaultTopStoriesList } from "./DefaultTopStoriesList";
import { TopStoriesListFromCustomApi } from "./TopStoriesListFromCustomApi";

export const TopStoriesList = () => {
    return process.env.REACT_APP_USE_CUSTOM_API ? (
        <TopStoriesListFromCustomApi />
    ) : (
        <DefaultTopStoriesList />
    );
};
