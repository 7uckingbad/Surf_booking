import { ChoosePackSection } from "./components/ChoosePackSection/ChoosePackSection";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { IntroSection } from "./components/IntroSection/IntroSection";
import { SurfSessionSection } from "./components/SurfSessionSection/SurfSessionSection";

function App() {
  return (
    <>
      <div className="heroSection">
        <Hero />
        <Header />
      </div>
      <IntroSection />
      <SurfSessionSection />
      <ChoosePackSection />
    </>
  );
}
export default App;
