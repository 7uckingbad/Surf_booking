import styles from "./ConfirmedPage.module.scss";
import confirmedIMg from "../../assets/ConfirmedImgs/ConfirmedImg.svg";
import { Stepper } from "../../assets/Stepper/Stepper";
import { BookingInfoPanel } from "../../components/BookingBlockComponents/BookingInfoPanel/BookingInfoPanel";
import { useLocation } from "react-router-dom";
import downloadImg from "../../assets/ConfirmedImgs/downloadIMG.svg";
import { useMemo } from "react";
import { format } from "date-fns";
import { BOARD_OPTIONS, INSTRUCTOR_PRICE } from "../../data/board";

export const ConfirmedPage = () => {
  const location = useLocation();
  const bookingData = location.state;
  const participants = bookingData?.participantsData ?? [];

  const bookingId = useMemo(() => {
    const year = new Date().getFullYear();
    const random = Math.floor(100 + Math.random() * 900);
    return `#SS-${year}-${random}`;
  }, []);

  const boardsTotal = participants.reduce((sum: number, p: any) => {
    const board = BOARD_OPTIONS.find((b) => b.id === p.boardId);
    return board ? sum + board.price * p.hours : sum;
  }, 0);

  const instructorTotal = participants
    .filter((p: any) => p.withInstructor)
    .reduce((sum: number, p: any) => sum + p.hours * INSTRUCTOR_PRICE, 0);

  const total = boardsTotal + instructorTotal;
  return (
    <div className={styles.confirmedBlock}>
      <Stepper />

      <div className={styles.twoColumns}>
        <div className={styles.leftColumn}>
          <img src={confirmedIMg} alt="" className={styles.leftColumnImg} />
        </div>

        <div className={styles.rightColumn}>
          <h2 className={styles.rightT}>Booking confirmed!</h2>
          <p className={styles.rigthP}>
            Your payment was successful and your surfboards are reserved. A
            confirmation has been sent to name@example.com{" "}
          </p>
          <BookingInfoPanel
            selectedDate={bookingData?.selectedDate}
            selectedTime={bookingData?.selectedTime}
            participantsCount={participants.length}
            readonly={true}
          />

          <div className={styles.confirmationBlock}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Booking ID:</span>
              <span className={styles.detailValue}>{bookingId}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date:</span>
              <span className={styles.detailValue}>
                {bookingData?.selectedDate &&
                  format(new Date(bookingData.selectedDate), "MMMM d, yyyy")}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Time:</span>
              <span className={styles.detailValue}>
                {bookingData?.selectedTime}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Guests:</span>
              <span className={styles.detailValue}>
                {participants.length} participants
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Total paid:</span>
              <span className={styles.detailValue}>€{total}</span>
            </div>

            <button className={styles.buttonComfirm}>
              Download confirmation
              <img src={downloadImg} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
