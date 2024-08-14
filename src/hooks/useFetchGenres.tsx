import useSWR from "swr";
import axios from "axios";
import { GenreResponse, Genre } from "../types/animeGenre";

// フェッチ関数の定義
const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

// ジャンルリストを取得するカスタムフック
export const useFetchGenres = () => {
  const { data, error } = useSWR<GenreResponse>(
    "https://api.jikan.moe/v4/genres/anime",
    (url: string) => fetcher<GenreResponse>(url)
  );

  return {
    data: data ? data.data : ([] as Genre[]),
    isLoading: !error && !data,
    isError: error,
  };
};
