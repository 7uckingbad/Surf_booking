import { BenefitsBlock } from "./components/BenefitsBlock/BenefitsBlock";
import { ChoosePackSection } from "./components/ChoosePackSection/ChoosePackSection";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { IntroSection } from "./components/IntroSection/IntroSection";
import { LocationSection } from "./components/Location/Location.Section";
import { ReviewsBlock } from "./components/ReviewsBlock/Rewiews";
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
      <BenefitsBlock />
      <ReviewsBlock />
      <LocationSection />
      <Footer />
    </>
  );
}
export default App;
