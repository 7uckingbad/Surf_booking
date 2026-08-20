import styles from "./ParticipantsSummary.module.scss";
import { BOARD_OPTIONS, INSTRUCTOR_PRICE } from "../../../data/board";
import type { ParticipantData } from "../ParticipantCard/ParticipantCard";

interface ParticipantsSummaryProps {
  participants: ParticipantData[];
}

export const ParticipantsSummary = ({
  participants,
}: ParticipantsSummaryProps) => {
  const filledParticipants = participants.filter((p) => p.boardId);

  const withInstructors = participants.filter((p) => p.withInstructor);

  return (
    <div>
      <ul className={styles.participantsList}>
        {filledParticipants.map((participant, index) => {
          const board = BOARD_OPTIONS.find((b) => b.id === participant.boardId);
          if (!board) return null;

          return (
            <li key={index} className={styles.participantRow}>
              <div className={styles.leftGroup}>
                <span className={styles.numberCircle}>{index + 1}</span>
                <span className={styles.level}>{board.level}</span>
              </div>

              <div className={styles.boardInfo}>
                <span className={styles.boardLabel}>{board.shortLabel}</span>
                <span className={styles.boardCount}>1 board</span>
              </div>

              <span className={styles.price}>€{board.price}</span>
            </li>
          );
        })}
      </ul>

      {withInstructors.length > 0 && (
        <div className={styles.instructorsBlock}>
          <h5 className={styles.instructorsTitle}>Instructors</h5>
          <ul className={styles.instructorsList}>
            {withInstructors.map((participant, index) => (
              <li key={index} className={styles.instructorRow}>
                <span>
                  Instructor {index + 1} ({participant.hours} hrs × €
                  {INSTRUCTOR_PRICE})
                </span>
                <span className={styles.price}>
                  €{participant.hours * INSTRUCTOR_PRICE}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
