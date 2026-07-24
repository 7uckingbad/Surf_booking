import { useEffect, useState } from "react";
import { SurfCalendar } from "../SurfCalendar/SurfCalendar";
import styles from "./SurfSessionSection.module.scss";
import { getWeather } from "../../api/api";
import { WavesChart } from "../WavesChart/WavesChart";
import { format, parseISO } from "date-fns";
import vector from "../../assets/IntroSectionImages/Vector.svg";

export const SurfSessionSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const dateString = selectedDate
          ? format(selectedDate, "yyyy-MM-dd")
          : undefined;

        const data = await getWeather(dateString);
        setWeather(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, [selectedDate]);

  return (
    <section className={styles.mainSection}>
      <h2 className={styles.h2Title}>PLAN YOUR SURF SESSION</h2>

      <div className={styles.twoColumns}>
        <div className={styles.leftColumn}>
          <h3 className={styles.h3Title}>CHOOSE YOUR PERFECT DAY</h3>
          <p className={styles.text}>
            lan your sessions ahead. Select your preferred dates to get accurate
            forecast data and check gear availability in our camp.
          </p>
          <div className={styles.calendar}>
            <SurfCalendar selected={selectedDate} onSelect={setSelectedDate} />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h3 className={styles.h3Title}>
            TODAY'S SWELL STATUS{" "}
            <span className={styles.dateText}>
              ({weather && format(parseISO(weather.date), "MMMM d")})
            </span>
          </h3>
          <p className={styles.textStatus}>
            {weather?.status}.{" "}
            <span className={styles.bestTimeText}>
              Best time: {weather?.bestTime}
            </span>
          </p>
          <p className={styles.text}>
            {/* Current swell height is 1.5m with a 12s period. Perfect for
            intermediate riders. The next high tide is at 14:20. */}
            {weather?.description}
          </p>
          <div className={styles.wavesChart}>
            {weather && <WavesChart chartData={weather.chartData} />}
          </div>

          <button className={styles.chartButton}>
            Book a Board for This Day
            <img src={vector} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
};
