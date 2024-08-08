import Footer from "../../../components/layouts/Footer";
import Header from "../../../components/layouts/Header";
import MarginPageY from "../../../components/layouts/MarginPageY";
import UserInfo from "../../../components/sections/UserInfo";

export default function ProfilePage() {
  return (
    <div>
      <Header />
      <main>
        <MarginPageY>
          <UserInfo />
        </MarginPageY>
      </main>
      <Footer />
    </div>
  );
}
