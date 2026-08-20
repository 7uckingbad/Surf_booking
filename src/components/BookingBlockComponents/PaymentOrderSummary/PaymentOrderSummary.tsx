import styles from "./PaymentOrderSummary.module.scss";
import { BOARD_OPTIONS, INSTRUCTOR_PRICE } from "../../../data/board";
import type { ParticipantData } from "../ParticipantCard/ParticipantCard";

interface PaymentOrderSummaryProps {
  participants: ParticipantData[];
  onBack: () => void;
  onPay: () => void;
}

interface BoardGroup {
  boardId: string;
  count: number;
  total: number;
}

export const PaymentOrderSummary = ({
  participants,
  onBack,
  onPay,
}: PaymentOrderSummaryProps) => {
  const boardGroups: BoardGroup[] = [];

  participants.forEach((p) => {
    if (!p.boardId) return;
    const board = BOARD_OPTIONS.find((b) => b.id === p.boardId);
    if (!board) return;

    const existing = boardGroups.find((g) => g.boardId === p.boardId);
    if (existing) {
      existing.count += 1;
      existing.total += board.price;
    } else {
      boardGroups.push({ boardId: p.boardId, count: 1, total: board.price });
    }
  });

  const instructorHours = participants
    .filter((p) => p.withInstructor)
    .reduce((sum, p) => sum + p.hours, 0);

  const instructorTotal = participants
    .filter((p) => p.withInstructor)
    .reduce((sum, p) => sum + p.hours * INSTRUCTOR_PRICE, 0);

  const boardsTotal = boardGroups.reduce((sum, g) => sum + g.total, 0);
  const total = boardsTotal + instructorTotal;

  return (
    <div className={styles.summaryCard}>
      <h4 className={styles.title}>Order Summary</h4>

      {boardGroups.map((group) => {
        const board = BOARD_OPTIONS.find((b) => b.id === group.boardId);
        if (!board) return null;

        return (
          <div key={group.boardId} className={styles.row}>
            <span>
              {board.level} {board.shortLabel} × {group.count}
            </span>
            <span className={styles.price}>€{group.total}</span>
          </div>
        );
      })}

      {instructorHours > 0 && (
        <div className={styles.row}>
          <span>Instructor ({instructorHours} hours)</span>
          <span>€{instructorTotal}</span>
        </div>
      )}

      <div className={styles.totalRow}>
        <span>Total:</span>
        <span>€{total}</span>
      </div>

      <div className={styles.buttonsRow}>
        <button className={styles.backButton} onClick={onBack}>
          ← Back to booking
        </button>
        <button className={styles.payButton} onClick={onPay}>
          Pay €{total}
        </button>
      </div>
    </div>
  );
};
