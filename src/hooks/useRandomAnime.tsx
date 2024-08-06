// src/hooks/useRandomAnime.ts
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { animeState } from "../atoms/animeAtom";

export const useRandomAnime = (): void => {
  const setAnime = useSetRecoilState(animeState);

  useEffect(() => {
    const fetchRandomAnime = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/random/anime`);
        const data = await response.json();
        if (data.data) {
          setAnime({
            mal_id: data.data.mal_id,
            title: data.data.title_japanese,
            synopsis: data.data.synopsis,
            image_url: data.data.images.jpg.large_image_url,
          });
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchRandomAnime();
  }, [setAnime]);
};
