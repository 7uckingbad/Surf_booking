import styles from "./Hero.module.scss";
import wavesVideo from "../../assets/wavesSprite/vawesVideo_(24).mp4";

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <video autoPlay loop muted playsInline className={styles.waveVideo}>
        <source src={wavesVideo} type="video/mp4" />
      </video>
      <h1 className={styles.title}>FREEDOM SURF</h1>
    </div>
  );
};
