import { AnimeListResponse, AnimeListState } from "../types/animeListStats";

export const fetchAnimeListByGenre = async (
  genre: string
): Promise<AnimeListState[]> => {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?genres=${genre}&limit=20`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: AnimeListResponse = await response.json();
    console.log("data", data);

    if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error("Unexpected data structure:", data);
      return []; // データ構造が予期しない場合、空の配列を返す
    }
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return []; // エラーが発生した場合、空の配列を返す
  }
};
