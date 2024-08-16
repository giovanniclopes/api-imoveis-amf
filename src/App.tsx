import { BackToTopButton } from "./components/BackToTopButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

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
