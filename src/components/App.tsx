import { useEffect, useState } from "react";
import {
  Comment,
  fetchLastComment,
  fetchTopStories,
  Story,
} from "../utils/apiFetcher";
import { decodeHtml } from "../utils/htmlDecoder";
import { useInterval } from "../utils/useInterval";
import "./app.css";

export const App = () => {
  const [comment, setComment] = useState<Comment>({} as Comment);
  const [stories, setStories] = useState<Story[]>([]);

  useInterval(async () => {
    const lastComment = await fetchLastComment();
    setComment(lastComment);
  }, 5_000);

  useEffect(() => {
    const fetchStories = async () => {
      const topStories: Story[] = await fetchTopStories();
      setStories(topStories);
    };

    fetchStories();
  }, []);

  const getStoriesList = (): JSX.Element[] => {
    return stories.map((story) => {
      return (
        <ul key={story.id}>
          <li>{story.id}</li>
          <li>{story.title}</li>
          <li>{story.url}</li>
        </ul>
      );
    });
  };

  return (
    <>
      <h1 className="header">
        Comment#{comment?.id} by {comment?.by}
      </h1>

      <h2>Text: {decodeHtml(comment?.text)}</h2>

      <div>{getStoriesList()}</div>
    </>
  );
};
