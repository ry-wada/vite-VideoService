import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { animeState } from "../atoms/animeAtom";
import { AnimeState } from "../types/animeState";

export const useFetchBannerAnime = (): void => {
  const setAnime = useSetRecoilState(animeState);

  useEffect(() => {
    const fetchRandomAnime = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/random/anime`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data", data);

        if (data.data) {
          const animeData: AnimeState = {
            mal_id: data.data.mal_id,
            title: data.data.title_japanese,
            synopsis: data.data.synopsis,
            image_url: data.data.images.jpg.large_image_url,
          };
          setAnime(animeData);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchRandomAnime();
  }, [setAnime]);
};
