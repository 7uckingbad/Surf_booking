import styles from "./Reviews.module.scss";
// import plusImg from "../../assets/reviewsBlockImg/plus.svg";
import review1 from "../../assets/reviewsBlockImg/Review_Card_1.svg";
import review2 from "../../assets/reviewsBlockImg/Review_Card_2.svg";
import review3 from "../../assets/reviewsBlockImg/Review_Card_3.svg";
import review4 from "../../assets/reviewsBlockImg/Review_Card_4.svg";
import review5 from "../../assets/reviewsBlockImg/Review_Card_5.svg";
import review6 from "../../assets/reviewsBlockImg/Review_Card_6.svg";
import review7 from "../../assets/reviewsBlockImg/Review_Card_7.svg";
import reviewsArrow from "../../assets/reviewsBlockImg/hugeicons_arrow-right-01.svg";
import { useRef, useState } from "react";

export const ReviewsBlock = () => {
  const reviewsImg = [
    review1,
    review2,
    review3,
    review4,
    review5,
    review6,
    review7,
  ];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    setShowLeftArrow((scrollRef.current?.scrollLeft ?? 0) > 10);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollByCard = (direction: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.children[1] as HTMLElement | undefined;
    const cardWidth = card?.clientWidth ?? 280;
    const gap = 24;

    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.textBlock}>
        <h2 className={styles.reviewsTitle}>WHAT OUR SURFERS SAY</h2>
        <p className={styles.reviewsText}>
          Join a community that turns every surf trip into an unforgettable
          story. Read how our members are improving their skills and finding new
          friends around the world.
        </p>
        <p className={styles.rating}>4.9 out of 5 based on 200+ reviews</p>
      </div>

      <div className={styles.carousel}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft} ${
            showLeftArrow ? "" : styles.arrowHidden
          }`}
          onClick={() => scrollByCard(-1)}
          aria-label="Previous review"
        >
          <img src={reviewsArrow} alt="" />
        </button>

        <div
          ref={scrollRef}
          className={styles.reviewsScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onScroll={handleScroll}
        >
          {reviewsImg.map((image, index) => (
            <img
              src={image}
              alt="Review"
              key={index}
              className={styles.reviewCard}
            />
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scrollByCard(1)}
          aria-label="Next review"
        >
          <img src={reviewsArrow} alt="" />
        </button>
      </div>
    </section>
  );
};
