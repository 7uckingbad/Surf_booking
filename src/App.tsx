import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { IntroSection } from "./components/IntroSection/IntroSection";

function App() {
  return (
    <>
      <div className="heroSection">
        <Hero />
        <Header />
      </div>
      <IntroSection />
    </>
  );
}

export default App;
