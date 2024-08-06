// GenreList.tsx
import React from "react";
import useSWR from "swr";
import axios from "axios";
import { Genre, GenreResponse } from "../../types/animeGenre";

// フェッチ関数の定義
const fetcher = (url: string) =>
  axios.get<GenreResponse>(url).then((res) => res.data);

const GenreList: React.FC = () => {
  const { data, error } = useSWR(
    "https://api.jikan.moe/v4/genres/anime",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data.data.map((genre: Genre) => (
          <div key={genre.mal_id}>{genre.name}</div>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
