export interface Genre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export interface GenreResponse {
  data: Genre[];
}
