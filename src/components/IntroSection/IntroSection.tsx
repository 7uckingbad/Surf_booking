import styles from "./IntroSection.module.scss";
import rightimage from "../../assets/IntroSectionImages/boards2.svg";
import firstImage from "../../assets/IntroSectionImages/1.svg";
import secondImage from "../../assets/IntroSectionImages/2.svg";
import thirdImage from "../../assets/IntroSectionImages/3.svg";
import vector from "../../assets/IntroSectionImages/Vector.svg";

export const IntroSection = () => {
  return (
    <section className={styles.introBlock}>
      <h2 className={styles.h2Title}>RIDE THE PERFECT WAVE</h2>

      <div className={styles.twoColumns}>
        <div className={styles.leftColumn}>
          <p className={styles.introText}>
            Check live ocean conditions and book premium surfboards to gear up
            for your next session. Join our community to connect with local
            surfers and ride the perfect wave in real-time."
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <img src={firstImage} alt="" className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Instant Surf Support</h4>
                <p className={styles.featureDescription}>
                  Chat with local experts and the community for real-time beach
                  conditions.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <img src={secondImage} alt="" className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Smart Swell Calendar</h4>
                <p className={styles.featureDescription}>
                  Perfectly time your sessions with integrated live wave and
                  wind forecasts.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <img src={thirdImage} alt="" className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Seamless Rental Flow</h4>
                <p className={styles.featureDescription}>
                  Skip the queues with beach-ready lockers and quick mobile
                  booking.
                </p>
              </div>
            </div>
          </div>

          <button className={styles.forecastButton}>
            Check Forecast
            <img src={vector} alt="" />
          </button>
        </div>

        <img src={rightimage} alt="Surfboards" className={styles.surfImage} />
      </div>
    </section>
  );
};
