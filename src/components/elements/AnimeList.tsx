"use client";

import React, { useEffect, useState } from "react";
import { fetchAnimeListByGenre } from "../../utils/fetchAnimeList";
import { AnimeState } from "../../types/animeState";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface AnimeListProps {
  genre: string;
  genreName: string;
}

const AnimeList: React.FC<AnimeListProps> = ({ genre, genreName }) => {
  const [animeList, setAnimeList] = useState<AnimeState[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAnimeList = async () => {
      try {
        const data = await fetchAnimeListByGenre(genre);
        setAnimeList(data);
      } catch (error) {
        console.error("Error loading anime list:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAnimeList();
  }, [genre]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        {genreName}のアニメ
      </Text>
      <Box overflowX="auto" whiteSpace="nowrap">
        <Flex>
          {animeList.map((anime) => (
            <Box
              key={anime.mal_id}
              minWidth="200px"
              m={2}
              position="relative"
              _hover={{ transform: "scale(1.1)", transition: "transform 0.3s" }}
            >
              <Image
                src={anime.images.jpg.image_url}
                alt={anime.title}
                objectFit="cover"
                boxSize="300px"
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default AnimeList;
