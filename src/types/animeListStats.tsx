import { AnimeState } from "./animeState";

export interface AnimeListState extends AnimeState {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export interface AnimeListResponse {
  data: AnimeListState[];
}
