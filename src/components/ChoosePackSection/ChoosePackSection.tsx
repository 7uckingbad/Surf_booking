import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ChoosePackSection.module.scss";

export const ChoosePackSection = () => {
  return (
    <section className={styles.packSection}>
      <h2 className={styles.h2Title}>CHOOSE YOUR PACK</h2>

      <ProductCard />
    </section>
  );
};
