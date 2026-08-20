import styles from "./OrderSummaryTotal.module.scss";
import { BOARD_OPTIONS, INSTRUCTOR_PRICE } from "../../../data/board";
import type { ParticipantData } from "../ParticipantCard/ParticipantCard";
import imgs from "../../../assets/mainIcon.svg";

interface OrderSummaryTotalProps {
  participants: ParticipantData[];
  onContinue: () => void;
}

export const OrderSummaryTotal = ({
  participants,
  onContinue,
}: OrderSummaryTotalProps) => {
  const boardTotal = participants.reduce((sum, p) => {
    const board = BOARD_OPTIONS.find((b) => b.id === p.boardId);
    if (!board) return sum;
    return sum + board.price * p.hours;
  }, 0);

  const instructorTotal = participants.reduce((sum, p) => {
    if (!p.withInstructor) return sum;
    return sum + INSTRUCTOR_PRICE * p.hours;
  }, 0);

  const total = boardTotal + instructorTotal;

  return (
    <div className={styles.summaryCard}>
      <h4 className={styles.title}>Order Summary</h4>

      <div className={styles.row}>
        <span className={styles.rowTitle}>Board rental (per day)</span>
        <span className={styles.rowPrice}>€{boardTotal}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.rowTitle}>Instructors</span>
        <span className={styles.rowPrice}>€{instructorTotal}</span>
      </div>

      <div className={styles.totalRow}>
        <span>Total:</span>
        <span className={styles.rowPrice}>€{total}</span>
      </div>

      <button className={styles.continueButton} onClick={onContinue}>
        Continue to payment €{total}
        <img src={imgs} alt="" />
      </button>
    </div>
  );
};
