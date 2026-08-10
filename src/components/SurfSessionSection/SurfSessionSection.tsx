import { useEffect, useState } from "react";
import { SurfCalendar } from "../SurfCalendar/SurfCalendar";
import styles from "./SurfSessionSection.module.scss";
import { getWeather, getWeatherRange } from "../../api/api";
import { WavesChart } from "../WavesChart/WavesChart";
import { addDays, format, parseISO } from "date-fns";
import vector from "../../assets/IntroSectionImages/Vector.svg";
import type { WeatherStatus } from "../../api/utils/getStatusColor";

interface WeatherData {
  date: string;
  title: string;
  waterTemperature: number;
  bestTime: string;
  status: string;
  description: string;
  chartData: number[];
}

export const SurfSessionSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [weatherRange, setWeatherRange] = useState<WeatherStatus[]>([]);

  useEffect(() => {
    const loadRange = async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const eightDaysLater = format(addDays(new Date(), 7), "yyyy-MM-dd");
      const data = await getWeatherRange(today, eightDaysLater);
      setWeatherRange(data || []);
    };
    loadRange();
  }, []);

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
            <SurfCalendar
              selected={selectedDate}
              onSelect={setSelectedDate}
              weatherRange={weatherRange}
            />
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
            {/* {weather && (
              <WavesChart
                chartData={weather.chartData}
                status={weather.status}
                description={weather.description}
              />
            )} */}
            {loading && (
              <p className={styles.loadingText}>Loading forecast...</p>
            )}
            {!loading && weather && (
              <WavesChart
                chartData={weather.chartData}
                status={weather.status}
                description={weather.description}
              />
            )}
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
