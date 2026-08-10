import styles from "./AboutLessonsBlock.module.scss";
import secondColumnImg from "../../assets/AboutLessonsImg/aboutLessonsImg.svg";

export const AboutLessonsBlock = () => {
  return (
    <section className={styles.AboutLessonsBlock}>
      <h2 className={styles.aboutLessonsTitle}>ABOUT LESSONS</h2>

      <div className={styles.twoColumns}>
        <div className={styles.firstColumn}>
          <p className={styles.firsstColumnText}>
            Private surfing lessons are the perfect choice for those who want to
            maximize their skills or learn the process of surfing from scratch.
            Our professional instructors will provide you with personal
            attention and customize the program to your individual needs.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>1 HOUR</span>
              <span className={styles.statLabel}>Lesson Duration</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>BEGINNER+</span>
              <span className={styles.statLabel}>Skill Level</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>5+</span>
              <span className={styles.statLabel}>Age Range</span>
            </div>
          </div>
        </div>
        <div className={styles.secondColumn}>
          <img
            src={secondColumnImg}
            alt=""
            className={styles.secondColumnImg}
          />

          <div className={styles.aboutText}>
            <span className={styles.aboutTitle}>WHO IS IT FOR?</span>
            <p className={styles.secondColumnText}>
              Private lessons are suitable for all skill levels, from beginners
              to advanced surfers who want to improve their technique and
              perform challenging tricks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
