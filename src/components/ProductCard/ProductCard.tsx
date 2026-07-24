import styles from "./ProductCard.module.scss";
import board1 from "../../assets/ProductCardImage/firstItem.png";

export const ProductCard = () => {
  return (
    <div className={styles.productCard}>
      <img src={board1} alt="board image" className={styles.boardImage} />
    </div>
  );
};
