import styles from "./ProductCard.module.scss";
import board1 from "../../assets/ProductCardImage/firstItem.png";
import board2 from "../../assets/ProductCardImage/secondItem.png";
import board3 from "../../assets/ProductCardImage/thirdItem.png";

export const ProductCard = () => {
  return (
    <div className={styles.productCard}>
      <img src={board1} alt="board image" className={styles.boardImage}/>
    </div>
  );
};
