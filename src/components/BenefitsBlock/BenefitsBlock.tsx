import styles from "./BenefitsBlock.module.scss";
import benefitsImg from "../../assets/AboutLessonsImg/benefitsFirstCol.svg";
import benefitsSecondImg from "../../assets/AboutLessonsImg/benefitsSecondImg.svg";

export const BenefitsBlock = () => {
  return (
    <section className={styles.benefitsBlock}>
      <h2 className={styles.benefitsTitle}>BENEFITS OF PRIVATE LESSONS</h2>

      <div className={styles.twoColumns}>
        <div className={styles.firstColumn}>
          <span className={styles.firstTitle}>PERSONALIZED APPROACH</span>
          <p className={styles.firstP}>
            You will get the maximum attention of an instructor who will improve
            your skills.
          </p>

          <img src={benefitsImg} alt="" className={styles.benefitsImgs} />
        </div>

        <div className={styles.secondColumn}>
          <img src={benefitsSecondImg} alt="" className={styles.benefitsImgs} />

          <span className={styles.firstTitle}>FAST PROGRESS</span>
          <p className={styles.firstP}>
            Private lessons allow you to develop your skills faster because the
            instructor's focus will be on you.
          </p>
        </div>
      </div>
    </section>
  );
};
