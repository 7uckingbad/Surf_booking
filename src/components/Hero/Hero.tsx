import styles from "./Hero.module.scss";
import vector from "../../assets/IntroSectionImages/Vector.svg";
import video from "../../assets/waves/fullHD.mp4";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <video autoPlay loop muted playsInline className={styles.heroVideo}>
        <source src={video} />
      </video>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>FREEDOM SURF</h1>
        <p className={styles.pText}>
          Your best ride starts here. Rent surfboards online in a few clicks
        </p>
      </div>
      <button className={styles.swellButton}>
        Rent Now
        <img src={vector} alt="Buttom Image" className={styles.img} />
      </button>
    </section>
  );
};
