import { Box } from "@chakra-ui/react";
import AnimeList from "../../../components/elements/AnimeList";
import Footer from "../../../components/layouts/Footer";
import Header from "../../../components/layouts/Header";
import MarginPageY from "../../../components/layouts/MarginPageY";
import Banner from "../../../components/sections/Banner";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <MarginPageY>
          <Banner />
          {/* <AnimeList genre="1" genreName="アクション" /> */}
          <AnimeList genre="2" genreName="アドベンチャー" />
          {/* <AnimeList genre="10" genreName="コメディ" /> */}
        </MarginPageY>
      </main>
      <Footer />
    </div>
  );
}
