import styles from "./FlexibleSchedule.module.scss";
import flexibleImg from "../../assets/AboutLessonsImg/flexible.svg";

export const FlexibleSchedule = () => {
  return (
    <section className={styles.flexibleBlock}>
      <h2 className={styles.flexibleTitle}>FLEXIBLE SCHEDULE</h2>
      <p className={styles.flexibleText}>
        We work with your schedule, so you can choose a convenient time for a
        lesson.
      </p>
      <img src={flexibleImg} alt="" className={styles.flexibleImg} />
    </section>
  );
};
