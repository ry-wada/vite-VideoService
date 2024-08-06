export interface AnimeState {
  mal_id: number;
  title: string;
  synopsis: string;
  image_url: string;
}

export interface AnimeListResponse {
  data: AnimeState[];
}
