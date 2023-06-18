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
}
