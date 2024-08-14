import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import axios from "axios";
import { animeState } from "../recoil/atoms/animeAtom";
import { AnimeState } from "../types/animeState";
import { useEffect } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchBannerAnime = (): void => {
  const setAnime = useSetRecoilState(animeState);

  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/random/anime`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const animeData: AnimeState = {
        mal_id: data.data.mal_id,
        title: data.data.title_japanese,
        synopsis: data.data.synopsis,
        image_url: data.data.images.jpg.large_image_url,
      };
      setAnime(animeData);
    }

    if (error) {
      console.error("Error fetching anime data:", error);
    }
  }, [data, error, setAnime]);
};
