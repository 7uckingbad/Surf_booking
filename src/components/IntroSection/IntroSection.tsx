import styles from "./IntroSection.module.scss";

export const IntroSection = () => {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>RIDE THE PERFECT WAVE</h1>
      <p className={styles.description}>
        Check live ocean conditions, book premium surfboards, and connect with
        local surfers in real-time.
      </p>
      <button className={styles.button}>Check Forecast</button>
    </section>
  );
};
