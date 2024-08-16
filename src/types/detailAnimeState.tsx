import { AnimeState } from "./animeState";

export interface DetailedAnimeState extends AnimeState {
  aired: { from: string };
  genres: { name: string }[];
  url: string;
}
