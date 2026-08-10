import { Footer } from "react-day-picker";
import { AboutLessonsBlock } from "../../components/AboutLessonsBlock/AboutLessonsBlock";
import { BenefitsBlock } from "../../components/BenefitsBlock/BenefitsBlock";
import { ChoosePackSection } from "../../components/ChoosePackSection/ChoosePackSection";
import { FlexibleSchedule } from "../../components/FlexibleSchedule/FlexibleSchedule";
import { IntroSection } from "../../components/IntroSection/IntroSection";
import { LocationSection } from "../../components/Location/Location.Section";
import { ReviewsBlock } from "../../components/ReviewsBlock/Rewiews";
import { SurfSessionSection } from "../../components/SurfSessionSection/SurfSessionSection";

export const Homepage = () => {
  return (
    <>
      <IntroSection />
      <SurfSessionSection />
      <ChoosePackSection />
      <AboutLessonsBlock />
      <BenefitsBlock />
      <FlexibleSchedule />
      <ReviewsBlock />
      <LocationSection />
      <Footer />
    </>
  );
};
