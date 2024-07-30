// pages/index.tsx
import { Box, Container, Grid, Heading, Image, Stack } from "@chakra-ui/react";
import { Button as MuiButton } from "@mui/material";

const VideoCard = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => (
  <Box
    borderWidth={1}
    borderRadius="md"
    overflow="hidden"
    boxShadow="md"
    position="relative"
  >
    <Image src={imageUrl} alt={title} boxSize="100%" objectFit="cover" />
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      textAlign="center"
      color="white"
    >
      <MuiButton variant="contained" color="primary">
        Watch
      </MuiButton>
    </Box>
    <Box p={4}>
      <Heading size="md">{title}</Heading>
    </Box>
  </Box>
);

const Home = () => (
  <Container maxW="container.xl" p={4}>
    <Heading as="h1" mb={8} textAlign="center">
      Video Streaming Platform
    </Heading>
    <Stack spacing={8}>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        <VideoCard
          title="Awesome Video 1"
          imageUrl="https://via.placeholder.com/300"
        />
        <VideoCard
          title="Awesome Video 2"
          imageUrl="https://via.placeholder.com/300"
        />
        <VideoCard
          title="Awesome Video 3"
          imageUrl="https://via.placeholder.com/300"
        />
        {/* さらに動画カードを追加できます */}
      </Grid>
    </Stack>
  </Container>
);

export default Home;
