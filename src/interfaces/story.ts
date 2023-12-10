export interface IStory {
    by: string;
    id: number;
    descendants: number[];
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
}

export interface IPagedObject {
    stories: IStory[];
    totalPagesCount: number;
}
