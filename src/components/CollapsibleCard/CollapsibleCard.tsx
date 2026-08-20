import { useState, type ReactNode } from "react";
import styles from "./CollapsibleCard.module.scss";
import arrow from "../../assets/RentalPageImgs/hugeicons_arrow-down-01.svg";

interface CollapsibleCardProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleCard = ({
  title,
  children,
  defaultOpen = true,
}: CollapsibleCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <h4 className={styles.title}>{title}</h4>
        <img
          src={arrow}
          alt=""
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </div>

      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};
