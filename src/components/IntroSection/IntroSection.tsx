import styles from "./IntroSection.module.scss";
import rightimage from "../../assets/IntroSectionImages/rightSectiomImage.png";
import vector from "../../assets/IntroSectionImages/Vector.png";

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
          <button className={styles.forecastButton}>
            Check Forecast
            {/* <img src={vector} alt="" className={styles.butImg} /> */}
          </button>
        </div>

        <img src={rightimage} alt="Surfboards" className={styles.surfImage} />
      </div>
    </section>
  );
};
