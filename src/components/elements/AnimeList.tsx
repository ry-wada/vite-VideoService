"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchAnimeListByGenre } from "../../utils/fetchAnimeList";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { AnimeListState } from "../../types/animeListStats";
import { AnimeListProps } from "../../types/animeListProps";

const AnimeList: React.FC<AnimeListProps> = ({
  genre,
  genreName,
  small = false,
}) => {
  const [animeList, setAnimeList] = useState<AnimeListState[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const loadAnimeList = useCallback(async () => {
    try {
      const data = await fetchAnimeListByGenre(genre);
      setAnimeList((prevList) => [...prevList, ...data]);
      setHasMore(false);
    } catch (error) {
      console.error("Error loading anime list:", error);
    } finally {
      setLoading(false);
    }
  }, [genre]);

  useEffect(() => {
    const currentObserverRef = observerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadAnimeList();
        }
      },
      { threshold: 1.0 }
    );

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasMore, loadAnimeList]);

  useEffect(() => {
    loadAnimeList();
  }, [loadAnimeList]);

  const handleImageClick = (mal_id: number) => {
    router.push(`/user/anime/${mal_id}`);
  };

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
              minWidth={small ? "100px" : "200px"}
              m={2}
              position="relative"
              _hover={{ transform: "scale(1.1)", transition: "transform 0.3s" }}
              cursor="pointer"
            >
              <Image
                src={anime.images.jpg.image_url}
                alt={anime.title}
                objectFit="cover"
                boxSize={small ? "200px" : "300px"}
                onClick={() => handleImageClick(anime.mal_id)}
              />
            </Box>
          ))}
        </Flex>
      </Box>
      <div
        ref={observerRef}
        style={{ height: "20px", background: "transparent" }}
      />
    </Box>
  );
};

export default AnimeList;
