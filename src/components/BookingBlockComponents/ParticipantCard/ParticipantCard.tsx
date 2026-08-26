import styles from "./ParticipantCard.module.scss";
import usersIMG from "../../../assets/ParticipantsIMG/userIMG.svg";
import clockIMG from "../../../assets/ParticipantsIMG/clockImg.svg";
import { BOARD_OPTIONS, INSTRUCTOR_PRICE } from "../../../data/board";

export interface ParticipantData {
  name: string;
  boardId: string;
  withInstructor: boolean;
  hours: number;
}

interface ParticipantCardProps {
  number: number;
  data: ParticipantData;
  onChange: (data: ParticipantData) => void;
}

export const ParticipantCard = ({
  number,
  data,
  onChange,
}: ParticipantCardProps) => {
  const selectedBoard = BOARD_OPTIONS.find((b) => b.id === data.boardId);
  const boardPrice = selectedBoard?.price ?? 0;
  const instructorPrice = data.withInstructor ? INSTRUCTOR_PRICE : 0;
  const total = (boardPrice + instructorPrice) * data.hours;

  return (
    <div className={styles.participantCard}>
      <h4 className={styles.number}>{number}</h4>

      <div className={styles.fieldsColumn}>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder={`Participant ${number} name`}
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className={styles.inputText}
          />
          <img src={usersIMG} alt="" className={styles.inputIcon} />
        </div>

        <div className={styles.inputWithIcon}>
          <select
            value={data.boardId}
            onChange={(e) => onChange({ ...data, boardId: e.target.value })}
            className={styles.inputSelect}
          >
            <option value="">Select board</option>
            {BOARD_OPTIONS.map((board) => (
              <option key={board.id} value={board.id}>
                {board.fullLabel} (€{board.price})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.instructorRow}>
          <label className={styles.toggleWrapper}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={data.withInstructor}
              onChange={(e) =>
                onChange({ ...data, withInstructor: e.target.checked })
              }
            />
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>
              + Add instructor (+€{INSTRUCTOR_PRICE})
            </span>
          </label>

          <div className={styles.hoursCounter}>
            <img src={clockIMG} alt="" className={styles.clockImg} />
            <span className={styles.hoursTitle}>Hours</span>

            <div className={styles.hoursPill}>
              <button
                type="button"
                className={styles.hoursButton}
                onClick={() =>
                  onChange({ ...data, hours: Math.max(1, data.hours - 1) })
                }
                disabled={data.hours <= 1}
              >
                −
              </button>
              <span className={styles.hoursValue}>{data.hours}</span>
              <button
                type="button"
                className={styles.hoursButton}
                onClick={() => onChange({ ...data, hours: data.hours + 1 })}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <p className={styles.cardTotal}>
          Participants {number} Total: €{total}
        </p>
      </div>
    </div>
  );
};
