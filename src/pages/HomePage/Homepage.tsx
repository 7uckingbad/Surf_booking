// import { Footer } from "react-day-picker";
// import { useState } from "react";
import { AboutLessonsBlock } from "../../components/AboutLessonsBlock/AboutLessonsBlock";
import { BenefitsBlock } from "../../components/BenefitsBlock/BenefitsBlock";
import { ChoosePackSection } from "../../components/ChoosePackSection/ChoosePackSection";
import { FlexibleSchedule } from "../../components/FlexibleSchedule/FlexibleSchedule";
import { Hero } from "../../components/Hero/Hero";
import { IntroSection } from "../../components/IntroSection/IntroSection";
import { LocationSection } from "../../components/Location/Location.Section";
import { ReviewsBlock } from "../../components/ReviewsBlock/Rewiews";
import { SurfSessionSection } from "../../components/SurfSessionSection/SurfSessionSection";
import { usePersistedState } from "../../hooks/usePersistedState";

export const Homepage = () => {
  const [selectedDate, setSelectedDate] = usePersistedState<Date | undefined>(
    "selectedDate",
    undefined,
  );
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <IntroSection />
      <div id="forecast">
        <SurfSessionSection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div id="rental">
        <ChoosePackSection selectedDate={selectedDate} />
      </div>
      <AboutLessonsBlock />
      <BenefitsBlock />
      <FlexibleSchedule />
      <ReviewsBlock />
      <LocationSection />
    </>
  );
};
