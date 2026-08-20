import styles from "./ChoosePackSection.module.scss";
import firstPackImg from "../../assets/ChooseYourPackImg/firstPack.jpg";
import secondPackImg from "../../assets/ChooseYourPackImg/secondPack.jpg";
import thirdPackImg from "../../assets/ChooseYourPackImg/thirdPack.jpg";
import textImage1 from "../../assets/ChooseYourPackImg/1.svg";
import vector from "../../assets/IntroSectionImages/Vector.svg";

import textImage2 from "../../assets/ChooseYourPackImg/2.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SurfSessionSectionProps {
  selectedDate: Date | undefined;
}

export const ChoosePackSection = ({
  selectedDate,
}: SurfSessionSectionProps) => {
  const [softboardInstructor, setSoftboardInstructor] = useState(false);
  const [hardboardInstructor, setHardboardInstructor] = useState(false);
  const [performanceInstructor, setPerformanceInstructor] = useState(false);

  const softboardPrice = softboardInstructor ? 40 + 20 : 40;
  const hardboardPrice = hardboardInstructor ? 55 + 20 : 55;
  const performancePrice = performanceInstructor ? 70 + 20 : 70;

  const navigate = useNavigate();

  const handleBookNowSoftBoard = () => {
    navigate("/rental", {
      state: {
        packageTitle: "Softboard Rental",
        basePrice: 40,
        withInstructor: softboardInstructor,
        selectedDate: selectedDate,
      },
    });
  };
  const handleBookNowHardBoard = () => {
    navigate("/rental", {
      state: {
        packageTitle: "Hardboard Rental",
        basePrice: 55,
        withInstructor: hardboardInstructor,
        selectedDate: selectedDate,
      },
    });
  };
  const handleBookNowPerfBoard = () => {
    navigate("/rental", {
      state: {
        packageTitle: "Perfomance Pack",
        basePrice: 70,
        withInstructor: performanceInstructor,
        selectedDate: selectedDate,
      },
    });
  };

  return (
    <section className={styles.packSection}>
      <h2 className={styles.h2Title}>CHOOSE YOUR PACK</h2>
      {/* Первый пак */}
      <div className={styles.firstPack}>
        <img
          src={firstPackImg}
          alt="Pack Image"
          className={styles.firstPackImg}
        />
        <div className={styles.infoCard}>
          <h2 className={styles.infoCardTitle}>Softboard Rental⁠</h2>
          <div className={styles.descriptionBlock}>
            <p className={styles.infoCardText}>
              <img src={textImage1} alt="" className={styles.image} />
              Perfect for beginners. Safe, high-buoyancy foam board.⁠
            </p>
            <p className={styles.infoCardText}>
              <img src={textImage2} alt="" className={styles.image} />
              Includes 2 Hour with instructor (optional)
            </p>
          </div>

          <label className={styles.toggleWrapper}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={softboardInstructor}
              onChange={(e) => setSoftboardInstructor(e.target.checked)}
            />
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>Add instructor (+€20)</span>
          </label>
          <p className={styles.price}>€{softboardPrice} / day</p>
          <button
            className={styles.bookButton}
            onClick={handleBookNowSoftBoard}
          >
            Book Now
            <img src={vector} alt="" />
          </button>
        </div>
      </div>
      {/* Второй пак */}
      <div className={styles.secondPack}>
        <img
          src={secondPackImg}
          alt="Pack Image"
          className={styles.firstPackImg}
        />
        <div className={styles.infoCardRightSide}>
          <h2 className={styles.infoCardTitle}>Hardboard Rental⁠⁠</h2>
          <div className={styles.descriptionBlock}>
            <p className={styles.infoCardText}>
              <img src={textImage1} alt="" className={styles.image} />
              For intermediate & pro surfers. Premium fiberglass and epoxy
              boards.⁠
            </p>
            <p className={styles.infoCardText}>
              <img src={textImage2} alt="" className={styles.image} />
              Includes 2 Hour with instructor (optional)
            </p>
          </div>

          <label className={styles.toggleWrapper}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={hardboardInstructor}
              onChange={(e) => setHardboardInstructor(e.target.checked)}
            />
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>Add instructor (+€20)</span>
          </label>
          <p className={styles.price}>€{hardboardPrice} / day</p>
          <button
            className={styles.bookButton}
            onClick={handleBookNowHardBoard}
          >
            Book Now
            <img src={vector} alt="" />
          </button>
        </div>
      </div>
      {/* Третий пак */}
      <div className={styles.thirdPack}>
        <img
          src={thirdPackImg}
          alt="Pack Image"
          className={styles.firstPackImg}
        />
        <div className={styles.infoCard}>
          <h2 className={styles.infoCardTitle}>Performance Pack</h2>
          <div className={styles.descriptionBlock}>
            <p className={styles.infoCardText}>
              <img src={textImage1} alt="" className={styles.image} />
              Top-tier board + carbon fins and premium wetsuit included.⁠
            </p>
            <p className={styles.infoCardText}>
              <img src={textImage2} alt="" className={styles.image} />
              Includes 2 Hour with instructor (optional)
            </p>
          </div>

          <label className={styles.toggleWrapper}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={performanceInstructor}
              onChange={(e) => setPerformanceInstructor(e.target.checked)}
            />
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>Add instructor (+€20)</span>
          </label>
          <p className={styles.price}>€{performancePrice} / day</p>
          <button
            className={styles.bookButton}
            onClick={handleBookNowPerfBoard}
          >
            Book Now
            <img src={vector} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
};
