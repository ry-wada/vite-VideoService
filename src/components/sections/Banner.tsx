"use client";

import React from "react";
import { Box, Container, Heading, Spacer, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { animeState } from "../../atoms/animeAtom";
import { useRandomAnime } from "../../hooks/useRandomAnime";

const Banner: React.FC = () => {
  const anime = useRecoilValue(animeState);
  const router = useRouter();

  useRandomAnime();

  const handleClick = () => {
    if (anime.mal_id) {
      router.push(`/user/anime/${anime.mal_id}`);
    }
  };

  // テキストを150文字でトリミングする
  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return ""; // textがない場合は空文字を返す
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Box
      position="relative"
      height="500px"
      backgroundImage={`url(${anime.image_url})`}
      backgroundSize="cover"
      backgroundPosition="center"
      cursor="pointer"
      onClick={handleClick}
    >
      <Container
        maxW="container.md"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        bg="rgba(0, 0, 0, 0.2)"
        color="white"
        p={4}
      >
        <Spacer />
        <Heading as="h1" size="xl" mb={4}>
          {anime.title}
        </Heading>
        <Text fontSize="lg">{truncateText(anime.synopsis, 150)}</Text>
      </Container>
    </Box>
  );
};

export default Banner;
