import useSWR from "swr";
import axios from "axios";
import { AnimeListResponse } from "../types/animeListStats";

// フェッチ関数の定義
const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

// ジャンルに基づいてアニメリストを取得するカスタムフック
export const useFetchAnimeListByGenre = (genre: string) => {
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
