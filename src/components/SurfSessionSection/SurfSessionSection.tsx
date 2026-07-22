import { SurfCalendar } from "../SurfCalendar/SurfCalendar";
import styles from "./SurfSessionSection.module.scss";

export const SurfSessionSection = () => {
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
            <SurfCalendar />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h3 className={styles.h3Title}>
            TODAY'S SWELL STATUS (September 10)
          </h3>
          <p className={styles.text}>Epic Swell. Best time: 08:00 - 11:00</p>
          <p className={styles.text}>
            Current swell height is 1.5m with a 12s period. Perfect for
            intermediate riders. The next high tide is at 14:20.
          </p>
        </div>
      </div>
    </section>
  );
};
