import styles from "./Hero.module.scss";
import buttImg from "../../assets/buttconicons/butIcon.png";

export const Hero = () => {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>FREEDOM SURF</h1>
        <button className={styles.swellButton}>
          Join SwellChat
          <img src={buttImg} alt="Buttom Image" className={styles.img} />
        </button>
      </section>
    </>
  );
};
