import { BackToTopButton } from "./components/BackToTopButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import "./assets/fonts/urbane/Urbane_Light.otf";
import "./assets/fonts/urbane/Urbane_Bold.otf";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default App;
