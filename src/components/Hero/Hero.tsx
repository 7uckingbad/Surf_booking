import styles from "./Hero.module.scss";
import heroImage from "../../assets/heroLogo/herobackGround.svg";
import heroLogo from "../../assets/heroLogo/mainLogo.svg";
import heroImageMob from "../../assets/heroLogo/mobileHeroIMG.svg";
// import vector from "../../assets/heroFingers.svg";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export const Hero = () => {
  const navigate = useNavigate();

  const handleRentNow = () => {
    navigate("/rental", {
      state: { selectedDate: format(new Date(), "yyyy-MM-dd") },
    });
  };

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
      <button className={styles.swellButton} onClick={handleRentNow}>
        Rent Now
        {/* <img src={vector} alt="Buttom Image" className={styles.img} /> */}
      </button>
    </section>
  );
};
