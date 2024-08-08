import axios from "axios";
import useSWR from "swr";
import { AnimeListResponse } from "../types/animeListStats";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useFetchAnimeListByGenre = (genre: string) => {
  const { data, error } = useSWR<AnimeListResponse>(
    `https://api.jikan.moe/v4/anime?genres=${genre}&limit=20`,
    fetcher,
    {
      errorRetryInterval: 1000, // 1秒後に再試行
      errorRetryCount: 3, // 最大3回まで再試行
    }
  );

  return {
    data: data ? data.data : [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetchAnimeListByGenre;
