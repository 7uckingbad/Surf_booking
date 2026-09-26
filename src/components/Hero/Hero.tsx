import styles from "./Hero.module.scss";
import heroImage from "../../assets/heroLogo/herobackGround.svg";
import heroLogo from "../../assets/heroLogo/mainLogo.svg";
import heroImageMob from "../../assets/heroLogo/mobileHeroIMG.svg";
import vector from "../../assets/IntroSectionImages/Vector.svg";
import { Link } from "react-scroll";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <img src={heroLogo} alt="" className={styles.heroLogo} />
      <img src={heroImage} alt="" className={styles.heroImage} />
      <img src={heroImageMob} alt="" className={styles.heroImageMobile} />
      <div className={styles.heroContent}>
        <h1 className={styles.title}>FREEDOM SURF</h1>
        <p className={styles.pText}>
          Your best ride starts here. Rent surfboards online in a few clicks
        </p>
      </div>
      <Link
        to="forecast"
        smooth={true}
        duration={1000}
        offset={-140}
        className={styles.swellButton}
      >
        Rent Now
        <img src={vector} alt="Buttom Image" className={styles.img} />
      </Link>
    </section>
  );
};
