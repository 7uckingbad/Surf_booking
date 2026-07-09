import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>RIDE THE PERFECT WAVE</h1>
      <p className={styles.descr}>
        Check live ocean conditions, book premium surfboards, and connect with
        local surfers in real-time.
      </p>
    </div>
  );
};
