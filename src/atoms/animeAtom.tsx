import { atom } from "recoil";
import { AnimeState } from "../types/animeState";

export const animeState = atom<AnimeState>({
  key: "animeState",
  default: {
    mal_id: 0,
    title: "",
    synopsis: "",
    image_url: "",
  },
});
