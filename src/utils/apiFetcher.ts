export interface Comment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}

export interface Story {
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

export const fetchLastComment = async (): Promise<Comment> => {
  let comment = {} as Comment;
  let apiResponse = await fetch(
    "https://hacker-news.firebaseio.com/v0/maxitem.json"
  );
  let maxItemId: number = await apiResponse.json();

  do {
    apiResponse = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${maxItemId}.json`
    );
    comment = await apiResponse.json();
    maxItemId--;
  } while (!comment?.id && maxItemId > 1);

  return comment;
};

export const fetchTopStories = async (): Promise<Story[]> => {
  let apiResponse = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storiesIds: number[] = await apiResponse.json();
  const stories: Story[] = [];

  await Promise.all(
    storiesIds.slice(0, 10).map(async (id) => {
      apiResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      const story: Story = await apiResponse.json();
      stories.push(story);
    })
  );

  return stories;
};
