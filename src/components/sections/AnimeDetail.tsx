"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Link,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { DetailedAnimeState } from "../../types/detailAnimeState";

const AnimeDetail: React.FC = () => {
  const { id } = useParams(); // useParams を使って id を取得
  const [anime, setAnime] = useState<DetailedAnimeState | null>(null);

  useEffect(() => {
    if (id) {
      const fetchAnime = async () => {
        try {
          const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
          const data = await response.json();
          setAnime({
            mal_id: data.data.mal_id,
            title: data.data.title_japanese,
            synopsis: data.data.synopsis,
            image_url: data.data.images.jpg.large_image_url,
            aired: data.data.aired,
            genres: data.data.genres,
            url: data.data.url,
          });
        } catch (error) {
          console.error("Error fetching anime data:", error);
        }
      };

      fetchAnime();
    }
  }, [id]);

  if (!anime) return <div>Loading...</div>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container maxW="container.md" p={4}>
      <Box mb={4}>
        <Heading as="h1" size="xl" mb={4}>
          {anime.title}
        </Heading>
        <Image src={anime.image_url} alt={anime.title} mb={4} />
        <Text fontSize="lg" mb={4}>
          公開日: {formatDate(anime.aired.from)}
        </Text>
        <Text fontSize="lg" mb={4}>
          {anime.synopsis}
        </Text>
        <SimpleGrid columns={2} spacing={2} mb={4}>
          {anime.genres.map((genre) => (
            <Tag key={genre.name}>{genre.name}</Tag>
          ))}
        </SimpleGrid>
        <Link href={anime.url} color="blue.500" isExternal>
          詳細ホームページ
        </Link>
      </Box>
    </Container>
  );
};

export default AnimeDetail;
