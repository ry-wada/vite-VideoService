import React from "react";
import { useFetchGenres } from "../../hooks/useFetchGenres";

const GenreList: React.FC = () => {
  const { data, isLoading, isError } = useFetchGenres();

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data.map((genre) => (
          <li key={genre.mal_id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
