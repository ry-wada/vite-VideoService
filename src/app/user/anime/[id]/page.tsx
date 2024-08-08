import Footer from "../../../../components/layouts/Footer";
import Header from "../../../../components/layouts/Header";
import MarginPageY from "../../../../components/layouts/MarginPageY";
import AnimeDetail from "../../../../components/sections/AnimeDetail";

export default function AnimeDetailPage() {
  return (
    <div>
      <Header />
      <main>
        <MarginPageY>
          <AnimeDetail />
        </MarginPageY>
      </main>
      <Footer />
    </div>
  );
}
